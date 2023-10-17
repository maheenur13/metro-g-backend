import { z } from 'zod';

const createVehicleSchema = z.object({
  body: z.object({
    model: z.string({
      required_error: 'model is required',
    }),
    brand: z.string({
      required_error: 'brand is required',
    }),
    cc: z.number({
      required_error: 'cc is required',
    }),
    weight: z.string().optional(),
    vehicleType: z.string({
      required_error: 'vehicle type required',
    }),
  }),
});
const updateVehicleSchema = z.object({
  body: z.object({
    model: z.string().optional(),
    brand: z.string().optional(),
    cc: z.number().optional(),
    weight: z.string().optional(),
    vehicleType: z.string().optional(),
  }),
});

export const vehicleValidation = {
  createVehicleSchema,
  updateVehicleSchema,
};
