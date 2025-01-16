import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerSchema, RegisterSchema } from '../../schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../api/axios';
import { AxiosError } from 'axios';
import { handleServerValidationErrors } from '../../utils/errors';
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
        toast.success('Account created successfully!');
        navigate('/auth/login', { replace: true });
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorData = err.response?.data;

      handleServerValidationErrors<RegisterSchema>(errorData, form.setError);
    }
  };

  return { form, onSubmit };
};

export default useRegisterForm;
