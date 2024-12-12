import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerSchema, RegisterSchema } from '../schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axios';
import { AxiosError } from 'axios';
import { isMessageError, isZodError, setZodErrors } from '../utils/helpers';
import { toast } from 'sonner';

const useRegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
      role: 'CHESS_PLAYER',
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async data => {
    try {
      const res = await api.post('/auth/register', data);

      if (res.status === 201) {
        navigate('/auth/login', { replace: true });
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorData = err.response?.data;

      if (isZodError(errorData)) {
        setZodErrors<RegisterSchema>(errorData, form.setError);
        return;
      }

      if (isMessageError(errorData)) {
        toast.error(errorData.message);
        return;
      }

      toast.error('An unexpected error occured');
    }
  };

  return { form, onSubmit };
};

export default useRegisterForm;
