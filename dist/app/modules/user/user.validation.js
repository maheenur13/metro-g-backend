"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createCustomer = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact no is required',
        }),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        password: zod_1.z.string({
            required_error: 'password required!',
        }),
    }),
});
const createAdmin = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact no is required',
        }),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        password: zod_1.z.string({
            required_error: 'password required!',
        }),
    }),
});
const createSuperAdmin = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact no is required',
        }),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        password: zod_1.z.string({
            required_error: 'password required!',
        }),
    }),
});
exports.UserValidation = {
    createCustomer,
    createAdmin,
    createSuperAdmin,
};
