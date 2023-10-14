import { Prisma, Vehicle } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { vehicleFilterableFields } from './vehicle.constant';
import { IVehicleDetails, IVehicleFilterRequest } from './vehicle.interface';

const createVehicle = async (data: Vehicle): Promise<Vehicle> => {
  const isExist = await prisma.vehicle.findFirst({
    where: {
      model: data.model,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle Already exist!');
  }

  return await prisma.vehicle.create({
    data,
  });
};
const getAllVehicle = async (
  filters: IVehicleFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Vehicle[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: vehicleFilterableFields.map(field => ({
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

  const whereConditions: Prisma.VehicleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.vehicle.findMany({
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

  const total = await prisma.vehicle.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleVehicle = async (id: string): Promise<Vehicle | null> => {
  const isExist = await prisma.vehicle.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle does not exist!');
  }

  return await prisma.vehicle.findUnique({
    where: {
      id,
    },
  });
};
const deleteVehicle = async (id: string): Promise<Vehicle | null> => {
  const isExist = await prisma.vehicle.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle does not exist!');
  }

  return await prisma.vehicle.delete({
    where: {
      id,
    },
  });
};
const updateVehicle = async (
  id: string,
  payload: IVehicleDetails
): Promise<Vehicle | null> => {
  const isExist = await prisma.vehicle.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vehicle does not exist!');
  }

  return await prisma.vehicle.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const vehicleService = {
  createVehicle,
  getAllVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
