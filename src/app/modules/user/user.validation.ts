import { z } from 'zod';

const createCustomer = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    profileImage: z.string().optional(),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    password: z.string({
      required_error: 'password required!',
    }),
  }),
});
const createAdmin = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    profileImage: z.string().optional(),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    password: z.string({
      required_error: 'password required!',
    }),
  }),
});
const createSuperAdmin = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),

    profileImage: z.string().optional(),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    password: z.string({
      required_error: 'password required!',
    }),
  }),
});

export const UserValidation = {
  createCustomer,
  createAdmin,
  createSuperAdmin,
};
