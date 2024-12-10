import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import ErrorMessage from '../utils/ErrorMessage';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import z from 'zod';
import api from '../../api/axios';
import useAuth from '../../hooks/useAuth';

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
      const err = error as AxiosError;
      const errorData = err.response?.data as {
        errors: z.inferFlattenedErrors<typeof loginSchema>;
      };

      if (errorData?.errors) {
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          form.setError(field as keyof LoginSchema, {
            type: 'manual',
            message: messages.toString(),
          });
        });
      } else {
        // Sooner to be added later
        alert('Notification here - different error');
      }
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
