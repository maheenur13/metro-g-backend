import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminController } from './admin.controller';
import { adminValidation } from './admin.validation';

const router = express.Router();

router.get('/', adminController.getAllAdmin);
router.get('/:id', adminController.getSingleAdmin);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(adminValidation.updateAdminSchema),
  adminController.updateAdmin
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.deleteAdmin
);

export const adminRoutes = router;
