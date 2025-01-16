import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { handleServerValidationErrors } from '../utils/errors';
import {
  tournamentSchema,
  TournamentSchema,
} from '../schemas/tournamentSchema';
import { TournamentSheetProps } from '../types/sheet';
import moment from 'moment';
import useTournamentQuery from './useTournamentQuery';

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
  const { refetch } = useTournamentQuery(tournament?.id as string);

  const defaultFormValues =
    formType === 'ADD'
      ? defaultValues
      : tournament
      ? {
          ...tournament,
          time: moment(tournament.time).format('HH:MM'),
          date: tournament.date.toString().split('T')[0],
          rounds: +tournament.rounds,
        }
      : undefined;

  const form = useForm<TournamentSchema>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(tournamentSchema),
  });

  const handleRequest = async (
    requestType: 'POST' | 'PUT',
    endpoint: string,
    formData: TournamentSchema,
    successMessage: string
  ) => {
    try {
      const response =
        requestType === 'POST'
          ? await api.post(endpoint, formData)
          : await api.put(endpoint, formData);

      if ([200, 201].includes(response.status)) {
        await refetch();
        toast.success(successMessage);
        form.reset();
        onSubmitSuccess?.();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      handleServerValidationErrors<TournamentSchema>(
        axiosError.response?.data,
        form.setError
      );
    }
  };

  const handleSubmit: SubmitHandler<TournamentSchema> = formData =>
    handleRequest(
      formType === 'ADD' ? 'POST' : 'PUT',
      formType === 'ADD'
        ? '/api/tournament'
        : `/api/tournament/${tournament.id}`,
      formData,
      formType === 'ADD'
        ? 'Tournament created successfully!'
        : 'Tournament updated successfully!'
    );

  return { form, handleSubmit };
};

export default useTournamentForm;
