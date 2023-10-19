import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadhelpers';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { mainServiceController } from './mainService.controller';
import { mainServiceValidation } from './mainService.validation';

const router = express.Router();

router.get('/', mainServiceController.getAllServices);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  // validateRequest(mainServiceValidation.mainServiceCreateSchema),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = mainServiceValidation.mainServiceCreateSchema.parse(
      JSON.parse(req.body.data)
    );
    return mainServiceController.createService(req, res, next);
  }
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
