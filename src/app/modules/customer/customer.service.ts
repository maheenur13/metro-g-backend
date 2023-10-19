import { Customer, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  customerFilterableFields,
  customerRelationalFields,
  customerRelationalFieldsMapper,
} from './customer.constant';
import { ICustomerFilterRequest } from './customer.interface';

const getAllCustomer = async (
  filters: ICustomerFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Customer[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: customerFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (customerRelationalFields.includes(key)) {
          return {
            [customerRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.CustomerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.customer.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.customer.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleCustomer = async (id: string): Promise<Customer | null> => {
  const result = await prisma.customer.findUnique({
    where: {
      userId:id
    },
  });
  return result;
};
const updateCustomer = async (
  id: string,
  payload: Partial<Customer>
): Promise<Customer> => {
  const result = await prisma.customer.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteCustomer = async (id: string): Promise<Customer> => {
  const result = await prisma.customer.delete({
    where: { id },
  });
  return result;
};

export const customerService = {
  updateCustomer,
  deleteCustomer,
  getSingleCustomer,
  getAllCustomer,
};
