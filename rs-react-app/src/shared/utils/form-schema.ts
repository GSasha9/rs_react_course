import * as z from 'zod';

import { FORM_ERRORS } from '../constants/form-errors';

export const formSchema = z.object({
  name: z
    .string()
    .min(1, FORM_ERRORS.name.required)
    .regex(/^[A-Z][a-zA-Z]/, FORM_ERRORS.name.pattern),
  age: z
    .string()
    .refine((val) => /^\d+$/.test(val), FORM_ERRORS.age.number)
    .refine((val) => Number(val) >= 0, FORM_ERRORS.age.negative),
  email: z.string().email(FORM_ERRORS.email.invalid),
  password: z
    .string()
    .min(8, FORM_ERRORS.password.min)
    .regex(/[A-Z]/, FORM_ERRORS.password.upper)
    .regex(/[a-z]/, FORM_ERRORS.password.lower)
    .regex(/[0-9]/, FORM_ERRORS.password.number)
    .regex(/[^A-Za-z0-9]/, FORM_ERRORS.password.special),
  r_password: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  acceptTC: z.literal('yes', { message: FORM_ERRORS.acceptTC.required }),
  country: z.string().min(1, FORM_ERRORS.country.required).optional(),
  file: z
    .string()
    .refine((val) => val.length > 0, FORM_ERRORS.file.required)
    .refine(
      (val) => /image\/(png|jpeg)/.test(val.split(',')[0]),
      FORM_ERRORS.file.type
    ),
});

export const validatedFormSchema = formSchema.refine(
  (data) => data.password === data.r_password,
  {
    message: FORM_ERRORS.r_password.mismatch,
    path: ['r_password'],
  }
);
