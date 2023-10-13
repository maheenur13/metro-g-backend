import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-customer',
  validateRequest(UserValidation.createCustomer),
  userController.createCustomer
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdmin),
  userController.createAdmin
);
router.post(
  '/create-super-admin',
  validateRequest(UserValidation.createSuperAdmin),
  userController.createSuperAdmin
);

// router.post(
//   '/create-faculty',
//   validateRequest(UserValidation.createFacultyZodSchema),
//   UserController.createFaculty
// );

// router.post(
//   '/create-admin',
//   validateRequest(UserValidation.createAdminZodSchema),
//   UserController.createAdmin
// );

//create faculty

//create admin
export const UserRoutes = router;
