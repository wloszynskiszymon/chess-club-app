import { useForm } from 'react-hook-form';
import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

const RegisterForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='firstName'
        render={({ field }) => (
          <>
            <FormLabel>First Name</FormLabel>
            <Input {...field} type='text' placeholder='First name...' />
          </>
        )}
      />
      <FormField
        control={form.control}
        name='lastName'
        render={({ field }) => (
          <>
            <FormLabel>Last Name</FormLabel>
            <Input {...field} type='text' placeholder='Last name...' />
          </>
        )}
      />
    </Form>
  );
};

export default RegisterForm;
