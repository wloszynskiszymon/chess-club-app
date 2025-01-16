import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../api/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useMemo, useCallback } from 'react';

import { handleServerValidationErrors } from '../../utils/errors';
import {
  tournamentSchema,
  TournamentSchema,
} from '../../schemas/tournamentSchema';
import { TournamentSheetProps } from '../../types/sheet';
import moment from 'moment';
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
        ...tournament,
        time: moment(tournament.time).format('HH:MM'),
        date: tournament.date.toString().split('T')[0],
        rounds: +tournament.rounds,
      };
    }
    return undefined;
  }, [formType, tournament]);

  const form = useForm<TournamentSchema>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(tournamentSchema),
  });

  const handleRequest = useCallback(
    async (
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

        if (response.status === 201) {
          await refetchTournaments();
        }
        if (response.status === 200) {
          await refetchTournament();
        }

        toast.success(successMessage);
        form.reset();
        onSubmitSuccess?.();
      } catch (error) {
        const axiosError = error as AxiosError;
        handleServerValidationErrors<TournamentSchema>(
          axiosError.response?.data,
          form.setError
        );
      }
    },
    [refetchTournament, refetchTournaments, form, onSubmitSuccess]
  );

  const handleSubmit: SubmitHandler<TournamentSchema> = useCallback(
    formData =>
      handleRequest(
        formType === 'ADD' ? 'POST' : 'PUT',
        formType === 'ADD'
          ? '/api/tournament'
          : `/api/tournament/${tournament.id}`,
        formData,
        formType === 'ADD'
          ? 'Tournament created successfully!'
          : 'Tournament updated successfully!'
      ),
    [handleRequest, formType, tournament?.id]
  );

  return { form, handleSubmit };
};

export default useTournamentForm;
