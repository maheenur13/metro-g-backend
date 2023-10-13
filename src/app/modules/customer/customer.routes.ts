import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { customerController } from './customer.controller';
import { customerValidation } from './customer.validation';

const router = express.Router();

router.get('/', customerController.getAllCustomer);
router.get('/:id', customerController.getSingleCustomer);
router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  validateRequest(customerValidation.updateCustomerSchema),
  customerController.updateCustomer
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  customerController.deleteCustomer
);

export const customerRoutes = router;
