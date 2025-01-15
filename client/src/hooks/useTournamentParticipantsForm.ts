import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import {
  handleServerValidationErrors,
  isFlattenedValidationError,
} from '../utils/errors';
import { AxiosError } from 'axios';
import { generateParticipantsSchema } from '../schemas/tournamentSchema';
import { Tournament } from '../types/server';
import { z } from 'zod';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';

const useTournamentParticipantsForm = ({
  participants,
  id,
  rounds,
}: Tournament) => {
  const participantsSchema = useMemo(
    () => generateParticipantsSchema(participants as any, +rounds),
    [participants]
  );

  type ParticipantsSchema = z.infer<typeof participantsSchema>;

  const defaultValues = useMemo(() => {
    return participants.reduce((acc, participant) => {
      acc[participant.user.id] = {
        wins: undefined,
        losses: undefined,
        draws: undefined,
        rating: undefined,
      };
      return acc;
    }, {} as Record<string, any>);
  }, [participants]);

  const form = useForm<ParticipantsSchema>({
    defaultValues,
    resolver: zodResolver(participantsSchema),
  });

  useEffect(() => {
    if (Object.values(form.formState.errors).length > 0) {
      toast.error('Please fill all fields before submitting!');
    }
  }, [form.formState.errors]);

  const handleSubmit = async (data: ParticipantsSchema) => {
    console.log(data);
    try {
      const res = await api.post(`/api/tournament/${id}/results`, data);
      console.log(res.data);
      toast.success('Changes saved successfully!');
      form.reset();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as unknown;

      handleServerValidationErrors<ParticipantsSchema>(
        errorData,
        form.setError
      );

      if (isFlattenedValidationError(errorData)) {
        toast.error('Please fill all fields before submitting!');
      }
    }
  };

  return { form, handleSubmit };
};

export default useTournamentParticipantsForm;
