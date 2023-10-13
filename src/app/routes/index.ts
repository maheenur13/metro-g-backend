import express from 'express';
import { adminRoutes } from '../modules/admin/admin.routes';
import { customerRoutes } from '../modules/customer/customer.routes';
import { UserRoutes } from '../modules/user/user.routes';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
