"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = require("../modules/admin/admin.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const customer_routes_1 = require("../modules/customer/customer.routes");
const mainService_routes_1 = require("../modules/mainService/mainService.routes");
const serviceCategory_routes_1 = require("../modules/serviceCategory/serviceCategory.routes");
const user_routes_1 = require("../modules/user/user.routes");
const vehicle_routes_1 = require("../modules/vehicle/vehicle.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/customer',
        route: customer_routes_1.customerRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.adminRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/service-category',
        route: serviceCategory_routes_1.serviceCategoryRoutes,
    },
    {
        path: '/services',
        route: mainService_routes_1.mainServiceRoutes,
    },
    {
        path: '/vehicles',
        route: vehicle_routes_1.vehicleRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
