import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import ErrorMessage from '../utils/ErrorMessage';
import { Link } from 'react-router-dom';

import useRegisterForm from '../../hooks/forms/useRegisterForm';

const RegisterForm = () => {
  const { form, onSubmit } = useRegisterForm();
  const { errors, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-3 mt-3'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex gap-2 flex-1'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <div className='w-full'>
                <FormLabel>First Name</FormLabel>
                <Input
                  {...field}
                  type='text'
                  placeholder='Your first name...'
                />
                <ErrorMessage>{errors?.firstName?.message}</ErrorMessage>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <div className='w-full'>
                <FormLabel>Last name</FormLabel>
                <Input {...field} type='text' placeholder='Your last name...' />
                <ErrorMessage>{errors?.lastName?.message}</ErrorMessage>
              </div>
            )}
          />
        </div>

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
        <div className='flex gap-2 flex-1'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <div className='w-full'>
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
              <div className='w-full'>
                <FormLabel>Confirm Password</FormLabel>
                <Input {...field} type='password' placeholder='*********' />
                <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
              </div>
            )}
          />
        </div>
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
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create an account!'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
