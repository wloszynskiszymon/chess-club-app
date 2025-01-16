import { generateParticipantsDefaultValues } from '../../schemas/tournamentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import {
  handleServerValidationErrors,
  isFlattenedValidationError,
} from '../../utils/errors';
import { AxiosError } from 'axios';
import { generateParticipantsSchema } from '../../schemas/tournamentSchema';
import { Tournament } from '../../types/server';
import { z } from 'zod';
import { useEffect } from 'react';
import { toast } from 'sonner';
import useTournamentQuery from '../queries/useTournamentQuery';

const useTournamentParticipantsForm = ({
  participants,
  id,
  rounds,
}: Tournament) => {
  const { refetch } = useTournamentQuery(id);
  const participantsSchema = generateParticipantsSchema(participants, rounds);
  const defaultValues = generateParticipantsDefaultValues(participants);
  type ParticipantsSchema = z.infer<typeof participantsSchema>;

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
    try {
      const method = participants[0].results.length > 0 ? 'put' : 'post';
      const url = `/api/tournament/${id}/results`;

      await api({
        method,
        url,
        data,
      });

      toast.success('Changes saved successfully!');
      refetch();
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
