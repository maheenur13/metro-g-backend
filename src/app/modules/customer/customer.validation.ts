import { z } from 'zod';

const updateCustomerSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
  }),
});

export const customerValidation = {
  updateCustomerSchema,
};
