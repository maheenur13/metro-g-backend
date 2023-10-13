import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { customerController } from './customer.controller';
import { customerValidation } from './customer.validation';

const router = express.Router();

// router.post(
//   '/create',
//   //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   validateRequest(customerValidation.createCustomer),
//   customerController.createCustomer
// );

router.get('/', customerController.getAllCustomer);
router.get('/:id', customerController.getSingleCustomer);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(customerValidation.updateCustomerSchema),
  customerController.updateCustomer
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  customerController.deleteCustomer
);
// router.get('/:id', StudentController.getByIdFromDB);

// router.post(
//   '/',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   validateRequest(StudentValidation.create),
//   StudentController.insertIntoDB
// );

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   validateRequest(StudentValidation.update),
//   StudentController.updateStudent
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   StudentController.deleteStudent
// );

export const customerRoutes = router;
