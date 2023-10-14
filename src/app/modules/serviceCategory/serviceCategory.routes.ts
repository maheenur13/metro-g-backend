import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { serviceCategoryController } from './serviceCategory.controller';
import { categoryServiceValidation } from './serviceCategory.validation';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(categoryServiceValidation.createServiceCategory),
  serviceCategoryController.createCategory
);
router.get('/categories', serviceCategoryController.getAllCategory);
router.get('category/:id', serviceCategoryController.getSingleCategory);
router.patch(
  '/update-category/:id',
  validateRequest(categoryServiceValidation.updateServiceCategory),
  serviceCategoryController.updateCategory
);
router.delete('/delete-category/:id', serviceCategoryController.deleteCategory);

export const serviceCategoryRoutes = router;
