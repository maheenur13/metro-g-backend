"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceCategory = zod_1.z.object({
    body: zod_1.z.object({
        categoryName: zod_1.z.string({
            required_error: 'category name is required',
        }),
    }),
});
const updateServiceCategory = zod_1.z.object({
    body: zod_1.z.object({
        categoryName: zod_1.z.string({
            required_error: 'category name is required',
        }),
    }),
});
exports.categoryServiceValidation = {
    createServiceCategory,
    updateServiceCategory,
};
