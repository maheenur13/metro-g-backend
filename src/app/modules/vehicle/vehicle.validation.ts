import { z } from 'zod';
import { VehicleTypesEnum } from './vehicle.constant';

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
    type: z.enum([...VehicleTypesEnum] as [string, ...string[]], {
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
    type: z.enum([...VehicleTypesEnum] as [string, ...string[]]).optional(),
  }),
});

export const vehicleValidation = {
  createVehicleSchema,
  updateVehicleSchema,
};
