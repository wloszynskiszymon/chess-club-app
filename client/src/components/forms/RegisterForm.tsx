import { useForm } from 'react-hook-form';
import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      firstName: '',
      email: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      role: 'chessPlayer',
      club: '',
    },
  });

  const selectedRole = form.watch('role');

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='firstName'
        render={({ field }) => (
          <div>
            <FormLabel>First Name</FormLabel>
            <Input {...field} type='text' placeholder='First name...' />
          </div>
        )}
      />
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <div>
            <FormLabel>Email</FormLabel>
            <Input {...field} type='email' placeholder='Enter your email...' />
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
          </div>
        )}
      />
      <FormField
        control={form.control}
        name='confirmPassword'
        render={({ field }) => (
          <div>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              {...field}
              type='password'
              placeholder='Repeat your password...'
            />
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
          </div>
        )}
      />

      {selectedRole === 'coordinator' && (
        <FormField
          control={form.control}
          name='club'
          render={({ field }) => (
            <div>
              <FormLabel>Choose your club name</FormLabel>
              <Input
                {...field}
                type='text'
                placeholder='Enter your club name...'
              />
            </div>
          )}
        />
      )}

      <Button type='submit'>Create an account!</Button>
    </Form>
  );
};

export default RegisterForm;
