import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../api/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useMemo, useEffect } from 'react';
import moment from 'moment';

import { handleServerValidationErrors } from '../../utils/errors';
import {
  tournamentSchema,
  TournamentSchema,
} from '../../schemas/tournamentSchema';
import { TournamentSheetProps } from '../../types/sheet';
import useTournamentQuery from '../queries/useTournamentQuery';
import useTournamentsQuery from '../queries/useTournamentsQuery';

const defaultValues: TournamentSchema = {
  title: '',
  description: '',
  date: '',
  time: '',
  rounds: 3,
};

const useTournamentForm = ({
  formType,
  tournament,
  onSubmitSuccess,
}: TournamentSheetProps) => {
  const { refetch: refetchTournament } = useTournamentQuery(
    tournament?.id as string
  );
  const { refetch: refetchTournaments } = useTournamentsQuery();

  const defaultFormValues = useMemo(() => {
    if (formType === 'ADD') {
      return defaultValues;
    }
    if (tournament) {
      return {
        title: tournament.title,
        description: tournament.description,
        date: moment(tournament.datetime).format('YYYY-MM-DD'),
        time: moment(tournament.datetime).format('HH:mm'),
        rounds: +tournament.rounds,
      };
    }
    return undefined;
  }, [formType, tournament]);

  const form = useForm<TournamentSchema>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(tournamentSchema),
  });

  useEffect(() => {
    if (Object.values(form.formState.errors).length > 0) {
      toast.error('Please fill all fields before submitting!');
    }
  }, [form.formState.errors]);

  const handleSubmit: SubmitHandler<TournamentSchema> = async formData => {
    try {
      const isUpdate = formType === 'EDIT';
      const method = isUpdate ? 'put' : 'post';
      const endpoint = isUpdate
        ? `/api/tournament/${tournament?.id}`
        : '/api/tournament';

      const data = {
        title: formData.title,
        description: formData.description,
        datetime: moment(
          `${formData.date} ${formData.time}`,
          'YYYY-MM-DD HH:mm'
        ).toISOString(),
        rounds: formData.rounds,
      };

      await api({
        method,
        url: endpoint,
        data,
      });

      toast.success(
        isUpdate
          ? 'Tournament updated successfully!'
          : 'Tournament created successfully!'
      );

      if (isUpdate) {
        await refetchTournament();
      } else {
        await refetchTournaments();
      }

      form.reset();
      onSubmitSuccess?.();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data;

      handleServerValidationErrors<TournamentSchema>(errorData, form.setError);
    }
  };

  return { form, handleSubmit };
};

export default useTournamentForm;
