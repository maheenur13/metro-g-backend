import { z } from 'zod';

const createServiceCategory = z.object({
  body: z.object({
    categoryName: z.string({
      required_error: 'category name is required',
    }),
  }),
});
const updateServiceCategory = z.object({
  body: z.object({
    categoryName: z.string({
      required_error: 'category name is required',
    }),
  }),
});

export const categoryServiceValidation = {
  createServiceCategory,
  updateServiceCategory,
};
