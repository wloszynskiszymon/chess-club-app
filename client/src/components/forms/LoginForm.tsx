import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import ErrorMessage from '../utils/ErrorMessage';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = (data: LoginSchema) => {
    console.log(data);
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
