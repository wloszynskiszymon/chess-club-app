import { z } from 'zod';

export const tournamentSchema = z.object({
  title: z
    .string()
    .min(2, 'Name must be between 2 and 64 characters')
    .max(64, 'Name must be between 2 and 64 characters'),
  description: z
    .string()
    .min(2, 'Description must be between 2 and 255 characters')
    .max(255, 'Description must be between 2 and 255 characters'),
  date: z.string().date('Invalid date'),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time'),
  rounds: z.preprocess(
    val => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().int().min(3).max(11)
  ),
});

export type TournamentSchema = z.infer<typeof tournamentSchema>;
