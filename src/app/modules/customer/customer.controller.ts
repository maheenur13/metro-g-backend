import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { customerFilterableFields } from './customer.constant';
import { customerService } from './customer.service';

const getAllCustomer = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await customerService.getAllCustomer(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'customer retrieve successfully!',
    data: result,
  });
});
const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.getSingleCustomer(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'customer retrieve successfully!',
    data: result,
  });
});
const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await customerService.updateCustomer(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile updated successfully!',
    data: result,
  });
});
const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.deleteCustomer(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'customer deleted successfully!',
    data: result,
  });
});

export const customerController = {
  updateCustomer,
  deleteCustomer,
  getSingleCustomer,
  getAllCustomer,
};
