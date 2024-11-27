import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'Your name must contain at least 2 characters!')
      .max(50, 'Your name must contain at most 50 characters!'),
    lastName: z
      .string()
      .min(2, 'Your name must contain at least 2 characters!')
      .max(50, 'Your name must contain at most 50 characters!'),
    email: z.string().email('This is not a valid email!'),
    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'This is not a valid date format!')
      .refine(
        date => refineBirthDate(date),
        'You must be between 7 and 99 years old!'
      ),
    password: z
      .string()
      .min(6, 'Your password must contain at least 6 characters!')
      .max(50, 'Your password must contain at most 50 characters!'),
    confirmPassword: z.string(),
    role: z.enum(['chessPlayer', 'coordinator']).optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

const refineBirthDate = (date: string) => {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    // invalid
    return age - 1 >= 7 && age - 1 <= 99;
  }
  // valid
  return age >= 7 && age <= 99;
};
