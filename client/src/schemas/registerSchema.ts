import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(date => refineBirthDate(date)),
  password: z.string().min(6).max(50),
  confirmPassword: z.string().min(6).max(50),
  role: z.enum(['chess player', 'coordinator']),
  clubName: z.string().min(2).max(50),
});

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
