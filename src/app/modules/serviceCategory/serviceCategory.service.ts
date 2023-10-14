import { Prisma, ServiceCategory } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { categoryFilterableFields } from './servicecategory.constant';
import {
  ICategoryFilterRequest,
  IServiceCategory,
} from './servicecategory.interface';

const createCategory = async (
  data: IServiceCategory
): Promise<ServiceCategory> => {
  const isExist = await prisma.serviceCategory.findFirst({
    where: {
      categoryName: data.categoryName,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category Already exist!');
  }

  return await prisma.serviceCategory.create({
    data,
  });
};
const getAllCategory = async (
  filters: ICategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ServiceCategory[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: categoryFilterableFields.map(field => ({
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
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.ServiceCategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.serviceCategory.findMany({
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

  const total = await prisma.serviceCategory.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleCategory = async (
  id: string
): Promise<ServiceCategory | null> => {
  const isExist = await prisma.serviceCategory.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category does not exist!');
  }

  return await prisma.serviceCategory.findUnique({
    where: {
      id,
    },
  });
};
const deleteCategory = async (id: string): Promise<ServiceCategory | null> => {
  const isExist = await prisma.serviceCategory.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category does not exist!');
  }

  return await prisma.serviceCategory.delete({
    where: {
      id,
    },
  });
};
const updateCategory = async (
  id: string,
  categoryName: string
): Promise<ServiceCategory | null> => {
  const isExist = await prisma.serviceCategory.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category does not exist!');
  }

  return await prisma.serviceCategory.update({
    where: {
      id,
    },
    data: { categoryName },
  });
};

export const serviceCategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
