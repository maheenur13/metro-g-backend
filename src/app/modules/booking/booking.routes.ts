import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
import { bookingValidationSchema } from './booking.validation';
const router = express.Router();

// router.get('/', bookingController.getAllBookings);
router.post(
  '/',
  validateRequest(bookingValidationSchema.createBookingSchema),
  bookingController.createBooking
);

// router.get('/:id', bookingController.getSingleBooking);
// router.patch(
//   '/:id',
//   validateRequest(bookingValidation.updateBookingSchema),
//   auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER),
//   bookingController.updateBooking
// );
// router.delete('/:id', bookingController.deleteBooking);

export const bookingRoutes = router;
