import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './mainService.constant';
import { mainService } from './mainService.service';

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await mainService.getAllServices(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all service retrieve successfully!',
    data: result,
  });
});
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const result = await mainService.getSingleService(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service retrieve successfully!',
    data: result,
  });
});
const createService = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await mainService.createService(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service created successfully!',
    data: result,
  });
});
const updateService = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await mainService.updateService(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service updated successfully!',
    data: result,
  });
});
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await mainService.deleteService(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service deleted successfully!',
    data: result,
  });
});

export const mainServiceController = {
  createService,
  updateService,
  deleteService,
  getSingleService,
  getAllServices,
};
