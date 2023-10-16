"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_utils_1 = require("./user.utils");
const createCustomer = (password, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.customer.findFirst({
        where: {
            OR: [{ email: data.email }, { contactNo: data.contactNo }],
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Already exist!');
    }
    const ifAdmin = yield prisma_1.default.admin.findFirst({
        where: {
            OR: [{ email: data.email }, { contactNo: data.contactNo }],
        },
    });
    if (ifAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not eligible to create this account. Please contact with administrator!');
    }
    const createdUser = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            role: 'CUSTOMER',
            password: yield (0, user_utils_1.hashPassword)(password),
        };
        const id = yield (0, user_utils_1.generateCustomerId)(data.name);
        userData.userId = id;
        userData.email = data.email;
        return yield transactionClient.user.create({
            data: userData,
        });
    }));
    return yield prisma_1.default.customer.create({
        data: Object.assign({ userId: createdUser.userId }, data),
    });
});
const createAdmin = (password, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.admin.findFirst({
        where: {
            OR: [{ email: data.email }, { contactNo: data.contactNo }],
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'admin Already exist!');
    }
    const ifUser = yield prisma_1.default.customer.findFirst({
        where: {
            OR: [{ email: data.email }, { contactNo: data.contactNo }],
        },
    });
    if (ifUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not eligible to create a customer account. Please contact with administrator!');
    }
    const createdUser = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            role: 'ADMIN',
            password: yield (0, user_utils_1.hashPassword)(password),
            email: data.email,
        };
        const id = yield (0, user_utils_1.generateAdminId)(data.name, 'ADMIN');
        userData.userId = id;
        return yield transactionClient.user.create({
            data: userData,
        });
    }));
    return yield prisma_1.default.admin.create({
        data: Object.assign({ role: 'ADMIN', userId: createdUser.userId }, data),
    });
});
const createSuperAdmin = (password, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.admin.findFirst({
        where: {
            OR: [{ email: data.email }, { contactNo: data.contactNo }],
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'admin already exist!');
    }
    const ifUser = yield prisma_1.default.customer.findFirst({
        where: {
            OR: [{ email: data.email }, { contactNo: data.contactNo }],
        },
    });
    if (ifUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not eligible to create a customer account. Please contact with administrator!');
    }
    const createdUser = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            role: 'SUPER_ADMIN',
            password: yield (0, user_utils_1.hashPassword)(password),
            email: data.email,
        };
        const id = yield (0, user_utils_1.generateAdminId)(data.name, 'SUPER_ADMIN');
        userData.userId = id;
        return yield transactionClient.user.create({
            data: userData,
        });
    }));
    return yield prisma_1.default.admin.create({
        data: Object.assign({ userId: createdUser.userId, role: 'SUPER_ADMIN' }, data),
    });
});
exports.UserService = {
    createCustomer,
    createAdmin,
    createSuperAdmin,
};
