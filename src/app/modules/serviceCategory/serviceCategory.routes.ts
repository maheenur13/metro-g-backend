import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { serviceCategoryController } from './serviceCategory.controller';
import { categoryServiceValidation } from './serviceCategory.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(categoryServiceValidation.createServiceCategory),
  serviceCategoryController.createCategory
);
router.get('/', serviceCategoryController.getAllCategory);
router.get('/:id', serviceCategoryController.getSingleCategory);
router.patch(
  '/:id',
  validateRequest(categoryServiceValidation.updateServiceCategory),
  auth(ENUM_USER_ROLE.ADMIN),
  serviceCategoryController.updateCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceCategoryController.deleteCategory
);

export const serviceCategoryRoutes = router;
