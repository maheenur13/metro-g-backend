"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleValidation = void 0;
const zod_1 = require("zod");
const vehicle_constant_1 = require("./vehicle.constant");
const createVehicleSchema = zod_1.z.object({
    body: zod_1.z.object({
        model: zod_1.z.string({
            required_error: 'model is required',
        }),
        brand: zod_1.z.string({
            required_error: 'brand is required',
        }),
        cc: zod_1.z.number({
            required_error: 'cc is required',
        }),
        weight: zod_1.z.string().optional(),
        type: zod_1.z.enum([...vehicle_constant_1.VehicleTypesEnum], {
            required_error: 'vehicle type required',
        }),
    }),
});
const updateVehicleSchema = zod_1.z.object({
    body: zod_1.z.object({
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        cc: zod_1.z.number().optional(),
        weight: zod_1.z.string().optional(),
        type: zod_1.z.enum([...vehicle_constant_1.VehicleTypesEnum]).optional(),
    }),
});
exports.vehicleValidation = {
    createVehicleSchema,
    updateVehicleSchema,
};
