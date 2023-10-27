import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await bookingService.createBooking(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking created successfully',
    data: result,
  });
});
// const getAllVehicle = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, vehicleFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await vehicleService.getAllVehicle(filters, options);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'All vehicle retrieve successfully',
//     data: result,
//   });
// });
// const getSingleVehicle = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await vehicleService.getSingleVehicle(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'vehicle retrieve successfully',
//     data: result,
//   });
// });
// const updateVehicle = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const data = req.body;

//   const result = await vehicleService.updateVehicle(id, data);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'category updated successfully',
//     data: result,
//   });
// });
// const deleteVehicle = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await vehicleService.deleteVehicle(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'vehicle deleted successfully',
//     data: result,
//   });
// });

export const bookingController = {
createBooking
};
