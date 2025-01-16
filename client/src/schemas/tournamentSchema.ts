import { z } from 'zod';
import { ParticipantWithResults } from '../types/server';

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

// TOOD: Add sum validation of wins, loses, draws
// Dynamic schema
export const generateParticipantsSchema = (
  participants: { id: string }[],
  rounds: number
) => {
  const reg = z
    .number()
    .nonnegative('Value cannot be negative!')
    .max(rounds, `Maxmium value is ${rounds}}!`);

  const participantSchema = z.object({
    wins: reg,
    losses: reg,
    draws: reg,
    rating: z
      .number()
      .nonnegative('Value cannot be negative!')
      .max(10, `Maxmium value is 10!`),
  });

  const dynamicSchema = participants.reduce((acc, participant) => {
    acc[participant.id] = participantSchema;
    return acc;
  }, {} as Record<string, any>);

  return z.object(dynamicSchema);
};

export const generateParticipantsDefaultValues = (
  participants: ParticipantWithResults[]
) => {
  // No results - set to default
  if (participants[0].results.length === 0) {
    return participants.reduce((acc, participant) => {
      acc[participant.id] = {
        wins: undefined,
        losses: undefined,
        draws: undefined,
        rating: undefined,
      };
      return acc;
    }, {} as Record<string, any>);
  } else {
    return participants.reduce((acc, participant) => {
      acc[participant.id] = {
        wins: participant.results[0].wins,
        losses: participant.results[0].losses,
        draws: participant.results[0].draws,
        rating: participant.results[0].rating,
      };
      return acc;
    }, {} as Record<string, any>);
  }
};
