import { Customer, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICustomer } from './user.interface';
import {
  generateAdminId,
  generateCustomerId,
  hashPassword,
} from './user.utils';

const createCustomer = async (
  password: string,
  data: ICustomer
): Promise<Customer> => {
  const isExist = await prisma.customer.findFirst({
    where: {
      OR: [{ email: data.email }, { contactNo: data.contactNo }],
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already exist!');
  }
  const ifAdmin = await prisma.admin.findFirst({
    where: {
      OR: [{ email: data.email }, { contactNo: data.contactNo }],
    },
  });

  if (ifAdmin) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not eligible to create this account. Please contact with administrator!'
    );
  }

  const createdUser = await prisma.$transaction(async transactionClient => {
    const userData: Partial<User> = {
      role: 'CUSTOMER',
      password: await hashPassword(password),
    };

    const id = await generateCustomerId(data.name);
    userData.userId = id;
    userData.email = data.email;

    return await transactionClient.user.create({
      data: userData as User,
    });
  });

  return await prisma.customer.create({
    data: {
      userId: createdUser.userId,
      ...data,
    },
  });
};
const createAdmin = async (
  password: string,
  data: ICustomer
): Promise<Customer> => {
  const isExist = await prisma.admin.findFirst({
    where: {
      OR: [{ email: data.email }, { contactNo: data.contactNo }],
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'admin Already exist!');
  }

  const ifUser = await prisma.customer.findFirst({
    where: {
      OR: [{ email: data.email }, { contactNo: data.contactNo }],
    },
  });

  if (ifUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not eligible to create a customer account. Please contact with administrator!'
    );
  }

  const createdUser = await prisma.$transaction(async transactionClient => {
    const userData: Partial<User> = {
      role: 'ADMIN',
      password: await hashPassword(password),
      email: data.email,
    };

    const id = await generateAdminId(data.name, 'ADMIN');
    userData.userId = id;

    return await transactionClient.user.create({
      data: userData as User,
    });
  });

  return await prisma.admin.create({
    data: {
      role: 'ADMIN',
      userId: createdUser.userId,
      ...data,
    },
  });
};
const createSuperAdmin = async (
  password: string,
  data: ICustomer
): Promise<Customer> => {
  const isExist = await prisma.admin.findFirst({
    where: {
      OR: [{ email: data.email }, { contactNo: data.contactNo }],
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'admin already exist!');
  }

  const ifUser = await prisma.customer.findFirst({
    where: {
      OR: [{ email: data.email }, { contactNo: data.contactNo }],
    },
  });

  if (ifUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not eligible to create a customer account. Please contact with administrator!'
    );
  }

  const createdUser = await prisma.$transaction(async transactionClient => {
    const userData: Partial<User> = {
      role: 'SUPER_ADMIN',
      password: await hashPassword(password),
      email: data.email,
    };

    const id = await generateAdminId(data.name, 'SUPER_ADMIN');
    userData.userId = id;

    return await transactionClient.user.create({
      data: userData as User,
    });
  });

  return await prisma.admin.create({
    data: {
      userId: createdUser.userId,
      role: 'SUPER_ADMIN',
      ...data,
    },
  });
};

export const UserService = {
  createCustomer,
  createAdmin,
  createSuperAdmin,
};
