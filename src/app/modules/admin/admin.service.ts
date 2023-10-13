import { Admin, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  adminFilterableFields,
  adminRelationalFields,
  adminRelationalFieldsMapper,
} from './admin.constant';
import { IAdminFilterRequest } from './admin.interface';

const getAllAdmin = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminFilterableFields.map(field => ({
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
        if (adminRelationalFields.includes(key)) {
          return {
            [adminRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
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
  const total = await prisma.admin.count({
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
const getSingleAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });
  return result;
};
const updateAdmin = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin> => {
  const result = await prisma.admin.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteAdmin = async (id: string): Promise<Admin> => {
  const result = await prisma.admin.delete({
    where: { id },
  });
  return result;
};

export const adminService = {
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  getAllAdmin,
};
