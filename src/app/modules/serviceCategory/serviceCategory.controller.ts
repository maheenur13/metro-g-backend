import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceCategoryService } from './serviceCategory.service';
import { categoryFilterableFields } from './servicecategory.constant';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await serviceCategoryService.createCategory(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfully',
    data: result,
  });
});
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await serviceCategoryService.getAllCategory(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All category retrieve successfully',
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await serviceCategoryService.getSingleCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category retrieve successfully',
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const result = await serviceCategoryService.updateCategory(id, categoryName);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category updated successfully',
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await serviceCategoryService.deleteCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category deleted successfully',
    data: result,
  });
});

export const serviceCategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
