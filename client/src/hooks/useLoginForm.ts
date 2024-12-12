import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginSchema } from '../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from './useAuth';
import api from '../api/axios';
import { AxiosError } from 'axios';
import { isMessageError, isZodError, setZodErrors } from '../utils/helpers';
import { toast } from 'sonner';

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
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as any;

      if (isZodError(errorData)) {
        setZodErrors<LoginSchema>(errorData, form.setError);
        return;
      }

      if (isMessageError(errorData)) {
        toast.error(errorData.message);
        return;
      }

      toast.error('An unexpected error occured');
    }
  };

  return { form, handleSubmit };
};

export default useLoginForm;
