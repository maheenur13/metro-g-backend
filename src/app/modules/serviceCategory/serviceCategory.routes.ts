import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { serviceCategoryController } from './serviceCategory.controller';
import { categoryServiceValidation } from './serviceCategory.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryServiceValidation.createServiceCategory),
  serviceCategoryController.createCategory
);
router.get('/', serviceCategoryController.getAllCategory);
router.get('/:id', serviceCategoryController.getSingleCategory);
router.patch(
  '/:id',
  validateRequest(categoryServiceValidation.updateServiceCategory),
  serviceCategoryController.updateCategory
);
router.delete('/:id', serviceCategoryController.deleteCategory);

export const serviceCategoryRoutes = router;
