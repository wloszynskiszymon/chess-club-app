import { z } from 'zod';
import prisma from '../prisma/prisma';

// Zod schema
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'Your name must contain at least 2 characters!')
      .max(50, 'Your name must contain at most 50 characters!')
      .trim(),
    lastName: z
      .string()
      .min(2, 'Your name must contain at least 2 characters!')
      .max(50, 'Your name must contain at most 50 characters!'),
    email: z.string().email('This is not a valid email!').trim(),
    birthdate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'This is not a valid date format!')
      .trim()
      .refine(
        date => refineBirthdate(date),
        'You must be between 7 and 99 years old!'
      ),
    password: z
      .string()
      .min(6, 'Your password must contain at least 6 characters!')
      .max(50, 'Your password must contain at most 50 characters!')
      .trim(),
    confirmPassword: z.string().trim(),
    role: z.enum(['CHESS_PLAYER', 'COORDINATOR']).optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  })
  .refine(
    async data => {
      const isEmailTaken = await checkIsEmailTaken(data.email);
      return !isEmailTaken;
    },
    {
      message: 'Email is already taken!',
      path: ['email'],
    }
  );

export type RegisterSchema = z.infer<typeof registerSchema>;

const refineBirthdate = (date: string) => {
  const today = new Date();
  const birthdate = new Date(date);
  const age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdate.getDate())
  ) {
    // invalid
    return age - 1 >= 7 && age - 1 <= 99;
  }
  // valid
  return age >= 7 && age <= 99;
};

const checkIsEmailTaken = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return !!user;
  } catch (err) {
    console.error(err);
    return true;
  }
};
