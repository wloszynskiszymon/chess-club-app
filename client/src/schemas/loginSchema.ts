import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'This field cannot be empty!').email('').trim(),
  password: z.string().min(1, 'This field cannot be empty!').trim(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
