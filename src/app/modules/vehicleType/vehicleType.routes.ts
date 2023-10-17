import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { vehicleTypeController } from './vehicleType.controller';
import { vehicleTypeValidation } from './vehicleType.validation';

const router = express.Router();

router.get('/', vehicleTypeController.getAllVehicleTypes);
router.post(
  '/',
  validateRequest(vehicleTypeValidation.createVehicleTypeSchema),
  vehicleTypeController.createVehicleType
);

router.get('/:id', vehicleTypeController.getSingleVehicleType);
router.patch(
  '/:id',
  validateRequest(vehicleTypeValidation.updateVehicleTypeSchema),
  vehicleTypeController.updateVehicleType
);
router.delete('/:id', vehicleTypeController.deleteVehicleType);

export const vehicleTypeRoutes = router;
