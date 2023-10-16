"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainServiceValidation = void 0;
const zod_1 = require("zod");
const mainServiceCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title required',
        }),
        details: zod_1.z.string({
            required_error: 'title required',
        }),
        description: zod_1.z.string({
            required_error: 'description required',
        }),
        price: zod_1.z.number({
            required_error: 'price required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'categoryId required',
        }),
        vehicleIds: zod_1.z.array(zod_1.z.object({
            vehicleId: zod_1.z.string({ required_error: 'vehicle id required' }),
        }, {
            required_error: 'vehicle ids required',
        })),
        rating: zod_1.z.number().optional(),
    }),
});
const mainServiceUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        details: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        categoryId: zod_1.z.string().optional(),
        vehicleId: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
    }),
});
exports.mainServiceValidation = {
    mainServiceCreateSchema,
    mainServiceUpdateSchema,
};
