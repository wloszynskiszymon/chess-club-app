import { SubmitHandler, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axios';
import { AxiosError } from 'axios';
import { handleServerValidationErrors } from '../utils/errors';
import { toast } from 'sonner';
import {
  tournamentSchema,
  TournamentSchema,
} from '../schemas/tournamentSchema';
import useTournamentsQuery from './useTournamentsQuery';

const useTournamentForm = () => {
  // const navigate = useNavigate();
  const { refetch } = useTournamentsQuery();

  const form = useForm<TournamentSchema>({
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      rounds: 3,
    },
    resolver: zodResolver(tournamentSchema),
  });

  const handleSubmit: SubmitHandler<TournamentSchema> = async data => {
    try {
      const res = await api.post('/api/tournament', data);
      if (res.status === 201) {
        await refetch();
        toast.success('Tournament created successfully!');
        form.reset();
        // const tournamentId = res.data.tournamentId;
        // navigate(`/tournament/${tournamentId}`);
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorData = err.response?.data;

      handleServerValidationErrors<TournamentSchema>(errorData, form.setError);
    }
  };

  return { form, handleSubmit };
};

export default useTournamentForm;
