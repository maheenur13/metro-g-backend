import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadhelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import {
  serviceRelationalFields,
  serviceRelationalFieldsMapper,
  serviceSearchableFields,
} from './mainService.constant';
import {
  IService,
  IServiceFilterRequest,
  IVehicleRequest,
} from './mainService.interface';

const createService = async (
  data: IService,
  file: any
): Promise<Service | null> => {
  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
  if (uploadedImage?.secure_url) {
    data.imageUrl = uploadedImage.secure_url;
  }
  const { vehicleIds, ...serviceData } = data;

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

  const createdService = await prisma.$transaction(async transactionClient => {
    const serviceResult = await transactionClient.service.create({
      data: serviceData,
    });

    if (vehicleIds && vehicleIds.length > 0) {
      await asyncForEach(vehicleIds, async (vehicle: IVehicleRequest) => {
        await transactionClient.serviceVehicle.create({
          data: {
            vehicleId: vehicle.vehicleId,
            serviceId: serviceResult.id,
          },
        });
      });
    }
    return serviceResult;
  });

  return await prisma.service.findUnique({
    where: {
      id: createdService.id,
    },
    include: {
      serviceVehicles: {
        include: {
          vehicle: true,
        },
      },
    },
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
      OR: serviceSearchableFields.map(field => {
        if (field === 'vehicleType') {
          return {
            ['serviceVehicles']: {
              ['some']: {
                ['vehicle']: {
                  [field]: {
                    equals: searchTerm,
                  },
                },
              },
            },
          };
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          };
        }
      }),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (serviceRelationalFields.includes(key)) {
          if (key === 'vehicleType') {
            return {
              [serviceRelationalFieldsMapper[key]]: {
                ['some']: {
                  ['vehicle']: {
                    [key]: {
                      equals: (filterData as any)[key],
                    },
                  },
                },
              },
            };
          } else {
            return {
              [serviceRelationalFieldsMapper[key]]: {
                id: (filterData as any)[key],
              },
            };
          }
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
    include: {
      serviceVehicles: {
        include: {
          vehicle: true,
        },
      },
      category: true,
    },
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
    include: {
      serviceVehicles: {
        include: {
          vehicle: true,
        },
      },
      reviews: true,
      category: true,
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
  const { vehicleIds, ...serviceData } = payload;
  const isExist = await prisma.service.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'service does not exist!');
  }

  const updatedService = await prisma.$transaction(async transactionClient => {
    const serviceResult = await transactionClient.service.update({
      where: {
        id,
      },
      data: serviceData,
    });

    const currentServiceVehicles =
      await transactionClient.serviceVehicle.findMany({
        where: { serviceId: serviceResult.id },
      });
    if (vehicleIds.length > currentServiceVehicles.length) {
      const newlyAddedVehicles = vehicleIds.filter(item1 =>
        currentServiceVehicles.some(item => item.vehicleId !== item1.vehicleId)
      );
      await asyncForEach(
        newlyAddedVehicles,
        async (vehicle: IVehicleRequest) => {
          await transactionClient.serviceVehicle.create({
            data: {
              vehicleId: vehicle.vehicleId,
              serviceId: serviceResult.id,
            },
          });
        }
      );
      // console.log({ newlyAddedVehicles });
    } else if (vehicleIds.length < currentServiceVehicles.length) {
      const deletableVehicles = currentServiceVehicles.filter(item1 =>
        vehicleIds.some(item => item.vehicleId !== item1.vehicleId)
      );

      await asyncForEach(
        deletableVehicles,
        async (vehicle: IVehicleRequest) => {
          await transactionClient.serviceVehicle.deleteMany({
            where: {
              serviceId: serviceResult.id,
              vehicleId: vehicle.vehicleId,
            },
          });
        }
      );
    }
    return serviceResult;
  });
  return updatedService;
};

export const mainService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
