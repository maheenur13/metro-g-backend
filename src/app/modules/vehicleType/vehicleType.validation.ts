import { z } from 'zod';

const createVehicleTypeSchema = z.object({
  body: z.object({
    type: z.string({
      required_error: 'vehicle type required',
    }),
  }),
});
const updateVehicleTypeSchema = z.object({
  body: z.object({
    type: z.string().optional(),
  }),
});

export const vehicleTypeValidation = {
  createVehicleTypeSchema,
  updateVehicleTypeSchema,
};
