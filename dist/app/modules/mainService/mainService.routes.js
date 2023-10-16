"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const mainService_controller_1 = require("./mainService.controller");
const mainService_validation_1 = require("./mainService.validation");
const router = express_1.default.Router();
router.get('/', mainService_controller_1.mainServiceController.getAllServices);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(mainService_validation_1.mainServiceValidation.mainServiceCreateSchema), mainService_controller_1.mainServiceController.createService);
router.get('/:id', mainService_controller_1.mainServiceController.getSingleService);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(mainService_validation_1.mainServiceValidation.mainServiceUpdateSchema), mainService_controller_1.mainServiceController.updateService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), mainService_controller_1.mainServiceController.deleteService);
exports.mainServiceRoutes = router;
