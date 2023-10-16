"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const vehicle_controller_1 = require("./vehicle.controller");
const vehicle_validation_1 = require("./vehicle.validation");
const router = express_1.default.Router();
router.get('/', vehicle_controller_1.vehicleController.getAllVehicle);
router.post('/create', (0, validateRequest_1.default)(vehicle_validation_1.vehicleValidation.createVehicleSchema), vehicle_controller_1.vehicleController.createVehicle);
router.get('/:id', vehicle_controller_1.vehicleController.getSingleVehicle);
router.patch('/:id', (0, validateRequest_1.default)(vehicle_validation_1.vehicleValidation.updateVehicleSchema), vehicle_controller_1.vehicleController.updateVehicle);
router.delete('/:id', vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicleRoutes = router;
