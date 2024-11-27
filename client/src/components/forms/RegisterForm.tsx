import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '../../schemas/registerSchema';
import ErrorMessage from '../utils/ErrorMessage';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      role: 'chessPlayer',
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = data => {
    console.log(data);
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
          name='birthDate'
          render={({ field }) => (
            <div>
              <FormLabel>Enter your birthdate</FormLabel>
              <Input {...field} type='date' />
              <ErrorMessage>{errors?.birthDate?.message}</ErrorMessage>
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
                  <RadioGroupItem value='chessPlayer' id='chessPlayer' />
                  <Label htmlFor='chessPlayer'>Chess Player</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='coordinator' id='coordinator' />
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
