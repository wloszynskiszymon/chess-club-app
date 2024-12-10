import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '../../schemas/registerSchema';
import ErrorMessage from '../utils/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import z from 'zod';
import api from '../../api/axios';

const RegisterForm = () => {
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
      const res = await api.post('http://127.0.0.1:3000/auth/register', data);

      if (res.status === 201) {
        navigate('/auth/login', { replace: true });
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorData = err.response?.data as {
        errors: z.inferFlattenedErrors<typeof registerSchema>;
      };

      if (errorData?.errors) {
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          form.setError(field as keyof RegisterSchema, {
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
        className='flex flex-col gap-3'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <div>
              <FormLabel>First Name</FormLabel>
              <Input {...field} type='text' placeholder='Your first name...' />
              <ErrorMessage>{errors?.firstName?.message}</ErrorMessage>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <div>
              <FormLabel>Last name</FormLabel>
              <Input {...field} type='text' placeholder='Your last name...' />
              <ErrorMessage>{errors?.lastName?.message}</ErrorMessage>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <div>
              <FormLabel>Email</FormLabel>
              <Input {...field} type='email' placeholder='example@gmail.com' />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='birthdate'
          render={({ field }) => (
            <div>
              <FormLabel>Enter your birthdate</FormLabel>
              <Input {...field} type='date' />
              <ErrorMessage>{errors?.birthdate?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <div>
              <FormLabel>Password</FormLabel>
              <Input {...field} type='password' placeholder='********' />
              <ErrorMessage>{errors?.password?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <div>
              <FormLabel>Confirm Password</FormLabel>
              <Input {...field} type='password' placeholder='*********' />
              <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <div>
              <Label>Choose your role</Label>
              <RadioGroup
                {...field}
                value={field.value}
                onValueChange={field.onChange}
                className='flex gap-4'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='CHESS_PLAYER' id='chessPlayer' />
                  <Label htmlFor='chessPlayer'>Chess Player</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='COORDINATOR' id='coordinator' />
                  <Label htmlFor='coordinator'>Coordinator</Label>
                </div>
              </RadioGroup>
              <ErrorMessage>{errors?.role?.message}</ErrorMessage>
            </div>
          )}
        />
        <Link
          className='text-xs text-right underline text-blue-500'
          to='/auth/login'
        >
          Do you have an account? Sign in!
        </Link>
        <Button type='submit'>Create an account!</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
