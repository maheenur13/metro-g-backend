"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_controller_1 = require("./customer.controller");
const customer_validation_1 = require("./customer.validation");
const router = express_1.default.Router();
router.get('/', customer_controller_1.customerController.getAllCustomer);
router.get('/:id', customer_controller_1.customerController.getSingleCustomer);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(customer_validation_1.customerValidation.updateCustomerSchema), customer_controller_1.customerController.updateCustomer);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), customer_controller_1.customerController.deleteCustomer);
exports.customerRoutes = router;
