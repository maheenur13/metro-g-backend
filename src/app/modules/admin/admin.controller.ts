import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { adminService } from './admin.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await adminService.getAllAdmin(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admins retrieve successfully!',
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getSingleAdmin(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin retrieve successfully!',
    data: result,
  });
});
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await adminService.updateAdmin(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin profile updated successfully!',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.deleteAdmin(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin deleted successfully!',
    data: result,
  });
});

export const adminController = {
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  getAllAdmin,
};
