import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import ErrorMessage from '../utils/ErrorMessage';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { toast } from 'sonner';
import { isMessageError, isZodError } from '../../utils/helpers';

const LoginForm = () => {
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
        Object.entries(errorData.errors.issues).forEach(([_, issue]) => {
          const { path, message } = issue;
          form.setError(path[0] as keyof LoginSchema, {
            type: 'manual',
            message: message.toString(),
          });
        });
        return;
      }

      if (isMessageError(errorData)) {
        toast.error(errorData.message);
        return;
      }

      toast.error('An unexpected error occured');
    }
  };

  const errors = form.formState.errors;

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-2'
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <div>
              <FormLabel>Email</FormLabel>
              <Input
                {...field}
                type='email'
                placeholder='Enter your email...'
              />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <div>
              <FormLabel>Password</FormLabel>
              <Input
                {...field}
                type='password'
                placeholder='Enter your password...'
              />
              <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              <ErrorMessage>{errors?.root?.message}</ErrorMessage>
            </div>
          )}
        />
        <Link
          className='text-xs text-right underline text-blue-500'
          to='/auth/register'
        >
          You don't have an account? Sign in!
        </Link>
        <Button type='submit'>Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
