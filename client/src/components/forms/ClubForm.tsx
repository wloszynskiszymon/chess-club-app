import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import ErrorMessage from '../utils/ErrorMessage';
import { Button } from '../ui/button';
import useClubForm from '../../hooks/forms/useClubForm';

const ClubForm = () => {
  const { form, handleSubmit } = useClubForm();
  const { errors, isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <div>
              <FormLabel>Club name</FormLabel>
              <Input
                {...field}
                type='text'
                placeholder='Enter your club name...'
              />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </div>
          )}
        />
        <Button className='w-full mt-5' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating club...' : 'Create club'}
        </Button>
      </form>
    </Form>
  );
};

export default ClubForm;
