import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { password, ...customerData } = req.body;
  const result = await UserService.createCustomer(password, customerData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'customer created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, ...adminData } = req.body;
  const result = await UserService.createAdmin(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});
const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, ...superAdminData } = req.body;
  const result = await UserService.createSuperAdmin(password, superAdminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super admin created successfully',
    data: result,
  });
});

export const userController = {
  createCustomer,
  createAdmin,
  createSuperAdmin,
};
