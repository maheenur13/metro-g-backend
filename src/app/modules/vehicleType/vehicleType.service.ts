import { Prisma, VehicleType } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { vehicleTypeSearchableFields } from './vehicleType.constant';
import {
  IVehicleTypeFilterRequest,
  IVehiclesPayload,
} from './vehicleType.interface';

const createVehicleType = async (
  data: IVehiclesPayload
): Promise<VehicleType> => {
  const isExist = await prisma.vehicleType.findFirst({
    where: {
      type: data.type,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle type Already exist!');
  }

  return await prisma.vehicleType.create({
    data,
  });
};
const getAllVehicleTypes = async (
  filters: IVehicleTypeFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<VehicleType[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: vehicleTypeSearchableFields.map(field => ({
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

  const whereConditions: Prisma.VehicleTypeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.vehicleType.findMany({
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

  const total = await prisma.vehicleType.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleVehicleType = async (
  id: string
): Promise<VehicleType | null> => {
  const isExist = await prisma.vehicleType.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle does not exist!');
  }

  return await prisma.vehicleType.findUnique({
    where: {
      id,
    },
  });
};
const deleteVehicleType = async (id: string): Promise<VehicleType | null> => {
  const isExist = await prisma.vehicleType.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle type does not exist!');
  }

  return await prisma.vehicleType.delete({
    where: {
      id,
    },
  });
};
const updateVehicleType = async (
  id: string,
  payload: IVehiclesPayload
): Promise<VehicleType | null> => {
  const isExist = await prisma.vehicleType.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle does not exist!');
  }

  return await prisma.vehicleType.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const vehicleTypeService = {
  createVehicleType,
  getAllVehicleTypes,
  getSingleVehicleType,
  updateVehicleType,
  deleteVehicleType,
};
