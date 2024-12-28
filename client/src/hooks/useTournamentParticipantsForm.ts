import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { handleServerValidationErrors } from '../utils/errors';
import { AxiosError } from 'axios';
import { generateParticipantsSchema } from '../schemas/tournamentSchema';
import { Tournament } from '../types/server';
import { z } from 'zod';
import { useMemo } from 'react';

const useTournamentParticipantsForm = ({
  participants,
  id,
  rounds,
}: Tournament) => {
  const participantsSchema = useMemo(
    () => generateParticipantsSchema(participants, +rounds),
    [participants]
  );

  type ParticipantsSchema = z.infer<typeof participantsSchema>;

  const defaultValues = useMemo(() => {
    return participants.reduce((acc, participant) => {
      acc[participant.user.id] = {
        wins: 0,
        losses: 0,
        draws: 0,
        rating: 0,
      };
      return acc;
    }, {} as Record<string, any>);
  }, [participants]);

  const form = useForm<ParticipantsSchema>({
    defaultValues,
    resolver: zodResolver(participantsSchema),
  });

  const handleSubmit = async (data: ParticipantsSchema) => {
    try {
      //   const res = await api.post(`/api/tournament/${id}`, data);
      console.log(data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as unknown;

      handleServerValidationErrors<ParticipantsSchema>(
        errorData,
        form.setError
      );
    }
  };

  return { form, handleSubmit };
};

export default useTournamentParticipantsForm;
