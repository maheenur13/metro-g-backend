import { z } from 'zod';

const mainServiceCreateSchema = z.object({
  title: z.string({
    required_error: 'title required',
  }),
  details: z.string({
    required_error: 'title required',
  }),
  description: z.string({
    required_error: 'description required',
  }),
  price: z.number({
    required_error: 'price required',
  }),
  categoryId: z.string({
    required_error: 'categoryId required',
  }),
  vehicleIds: z.array(
    z.object(
      {
        vehicleId: z.string({ required_error: 'vehicle id required' }),
      },
      {
        required_error: 'vehicle ids required',
      }
    )
  ),
  rating: z.number().optional(),
  specification: z.string().optional(),
});
const mainServiceUpdateSchema = z.object({
  title: z.string().optional(),
  details: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  categoryId: z.string().optional(),
  vehicleId: z.string().optional(),
  rating: z.number().optional(),
  specification: z.string().optional(),
});

export const mainServiceValidation = {
  mainServiceCreateSchema,
  mainServiceUpdateSchema,
};
