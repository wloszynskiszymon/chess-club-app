import z from 'zod';

export const mailSchema = z.object({
  subject: z.string().min(1, 'No subject declared!').trim(),
  to: z.string().email().min(1, 'No one selected!').trim(),
  body: z
    .string()
    .min(1, 'You cannot send empty mail!')
    .max(2048, 'Maximum length is 2048 characters!')
    .trim(),
});

export type MailSchema = z.infer<typeof mailSchema>;
