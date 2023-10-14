import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  serviceFilterableFields,
  serviceRelationalFields,
  serviceRelationalFieldsMapper,
} from './mainService.constant';
import { IService, IServiceFilterRequest } from './mainService.interface';

const createService = async (data: Service): Promise<Service> => {
  const isExist = await prisma.service.findFirst({
    where: {
      OR: [
        {
          title: data.title,
        },
      ],
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'service already exist!');
  }

  return await prisma.service.create({
    data,
  });
};
const getAllServices = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceFilterableFields.map(field => ({
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
        if (serviceRelationalFields.includes(key)) {
          return {
            [serviceRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
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

  const total = await prisma.service.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleService = async (id: string): Promise<Service | null> => {
  const isExist = await prisma.service.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'service does not exist!');
  }

  return await prisma.service.findUnique({
    where: {
      id,
    },
  });
};
const deleteService = async (id: string): Promise<Service | null> => {
  const isExist = await prisma.service.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'service does not exist!');
  }

  return await prisma.service.delete({
    where: {
      id,
    },
  });
};
const updateService = async (
  id: string,
  payload: IService
): Promise<Service | null> => {
  const isExist = await prisma.service.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'service does not exist!');
  }

  return await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const mainService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
