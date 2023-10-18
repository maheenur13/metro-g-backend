import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { vehicleTypeFilterableFields } from './vehicleType.constant';
import { vehicleTypeService } from './vehicleType.service';

const createVehicleType = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await vehicleTypeService.createVehicleType(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vehicle created successfully',
    data: result,
  });
});
const getAllVehicleTypes = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, vehicleTypeFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await vehicleTypeService.getAllVehicleTypes(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All vehicle types retrieve successfully',
    data: result,
  });
});
const getSingleVehicleType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await vehicleTypeService.getSingleVehicleType(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vehicle type retrieve successfully',
    data: result,
  });
});
const updateVehicleType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const typeData = req.body;
  const result = await vehicleTypeService.updateVehicleType(id, typeData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category type updated successfully',
    data: result,
  });
});
const deleteVehicleType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await vehicleTypeService.deleteVehicleType(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vehicle type deleted successfully',
    data: result,
  });
});

export const vehicleTypeController = {
  createVehicleType,
  getAllVehicleTypes,
  getSingleVehicleType,
  updateVehicleType,
  deleteVehicleType,
};
