import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ClubSchema, clubSchema } from '../../schemas/clubSchema';
import useUserQuery from '../queries/useUserQuery';
import api from '../../api/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { handleServerValidationErrors } from '../../api/errors';

const useClubForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(clubSchema),
  });
  const { refetch } = useUserQuery();

  const handleSubmit = async (data: ClubSchema) => {
    try {
      console.log(data);
      const res = await api.post('/api/club', data);
      if (res.status === 201) {
        refetch();
        toast.success('Club created successfully');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as unknown;
      console.error(errorData);
      handleServerValidationErrors<ClubSchema>(errorData, form.setError);
    }
  };

  return { form, handleSubmit };
};

export default useClubForm;
