import express from 'express';
import { adminRoutes } from '../modules/admin/admin.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { customerRoutes } from '../modules/customer/customer.routes';
import { mainServiceRoutes } from '../modules/mainService/mainService.routes';
import { serviceCategoryRoutes } from '../modules/serviceCategory/serviceCategory.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { vehicleRoutes } from '../modules/vehicle/vehicle.routes';
import { vehicleTypeRoutes } from '../modules/vehicleType/vehicleType.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/customer',
    route: customerRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/service-category',
    route: serviceCategoryRoutes,
  },
  {
    path: '/services',
    route: mainServiceRoutes,
  },
  {
    path: '/vehicles',
    route: vehicleRoutes,
  },
  {
    path: '/vehicle-types',
    route: vehicleTypeRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
