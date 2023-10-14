import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { vehicleController } from './vehicle.controller';
import { vehicleValidation } from './vehicle.validation';

const router = express.Router();

router.get('/', vehicleController.getAllVehicle);
router.post(
  '/create',
  validateRequest(vehicleValidation.createVehicleSchema),
  vehicleController.createVehicle
);

router.get('/:id', vehicleController.getSingleVehicle);
router.patch(
  '/:id',
  validateRequest(vehicleValidation.updateVehicleSchema),
  vehicleController.updateVehicle
);
router.delete('/:id', vehicleController.deleteVehicle);

export const vehicleRoutes = router;
