import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginSchema } from '../../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '../useAuth';
import api from '../../api/axios';
import { AxiosError } from 'axios';
import { handleServerValidationErrors } from '../../utils/errors';

const useLoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { setToken } = useAuth();

  const handleSubmit = async (data: LoginSchema) => {
    try {
      const res = await api.post('/auth/login', data);
      setToken(res.data.token);
      navigate('/', { replace: true });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as unknown;

      handleServerValidationErrors<LoginSchema>(errorData, form.setError);
    }
  };

  return { form, handleSubmit };
};

export default useLoginForm;
