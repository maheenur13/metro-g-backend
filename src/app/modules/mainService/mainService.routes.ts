import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { mainServiceController } from './mainService.controller';
import { mainServiceValidation } from './mainService.validation';

const router = express.Router();

router.get('/', mainServiceController.getAllServices);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(mainServiceValidation.mainServiceCreateSchema),
  mainServiceController.createService
);

router.get('/:id', mainServiceController.getSingleService);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(mainServiceValidation.mainServiceUpdateSchema),
  mainServiceController.updateService
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  mainServiceController.deleteService
);

export const mainServiceRoutes = router;
