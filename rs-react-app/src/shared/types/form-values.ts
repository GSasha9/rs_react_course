import type { z } from 'zod';

import { validatedFormSchema } from '@/shared/utils/form-schema';

export type FormValues = z.infer<typeof validatedFormSchema>;
