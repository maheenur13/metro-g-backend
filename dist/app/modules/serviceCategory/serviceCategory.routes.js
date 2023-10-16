"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const serviceCategory_controller_1 = require("./serviceCategory.controller");
const serviceCategory_validation_1 = require("./serviceCategory.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(serviceCategory_validation_1.categoryServiceValidation.createServiceCategory), serviceCategory_controller_1.serviceCategoryController.createCategory);
router.get('/', serviceCategory_controller_1.serviceCategoryController.getAllCategory);
router.get('/:id', serviceCategory_controller_1.serviceCategoryController.getSingleCategory);
router.patch('/:id', (0, validateRequest_1.default)(serviceCategory_validation_1.categoryServiceValidation.updateServiceCategory), serviceCategory_controller_1.serviceCategoryController.updateCategory);
router.delete('/:id', serviceCategory_controller_1.serviceCategoryController.deleteCategory);
exports.serviceCategoryRoutes = router;
