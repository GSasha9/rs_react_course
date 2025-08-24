import * as z from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[A-Z][a-zA-Z]/, 'Name must start with an uppercase letter'),
  age: z
    .string()
    .refine((val) => /^\d+$/.test(val), 'Age must be a number')
    .refine((val) => Number(val) >= 0, 'Age cannot be negative'),
  email: z.string().email('Invalid emil'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'At least one uppercase letter required')
    .regex(/[a-z]/, 'At least one lowercase letter required')
    .regex(/[0-9]/, 'At least one number required')
    .regex(/[^A-Za-z0-9]/, 'At least one special character required'),
  r_password: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  acceptTC: z.literal('yes', { message: 'You must accept terms' }),
  country: z.string().min(1, 'Select a country'),
  file: z
    .string()
    .refine((val) => val.length > 0, 'File is required')
    .refine((val) => {
      const header = val.split(',')[0];

      return /image\/(png|jpeg)/.test(header);
    }, 'Only PNG or JPEG allowed'),
});

export const validatedFormSchema = formSchema.refine(
  (data) => data.password === data.r_password,
  {
    message: 'Passwords must match',
    path: ['r_password'],
  }
);
