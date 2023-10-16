"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-customer', (0, validateRequest_1.default)(user_validation_1.UserValidation.createCustomer), user_controller_1.userController.createCustomer);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.UserValidation.createAdmin), user_controller_1.userController.createAdmin);
router.post('/create-super-admin', (0, validateRequest_1.default)(user_validation_1.UserValidation.createSuperAdmin), user_controller_1.userController.createSuperAdmin);
exports.UserRoutes = router;
