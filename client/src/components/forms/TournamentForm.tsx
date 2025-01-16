import { Form, FormField, FormLabel } from '../ui/form';
import useTournamentForm from '../../hooks/forms/useTournamentForm';
import { Input } from '../ui/input';
import ErrorMessage from '../utils/ErrorMessage';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { TournamentSheetProps } from '../../types/sheet';

const TournamentForm = (props: TournamentSheetProps) => {
  const { form, handleSubmit } = useTournamentForm(props);
  const { errors, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-2'
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <div>
              <FormLabel>Title</FormLabel>
              <Input {...field} type='text' placeholder='Tournament title...' />
              <ErrorMessage>{errors?.title?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <div>
              <FormLabel>Description</FormLabel>
              <Textarea
                className=' resize-none h-32'
                {...field}
                placeholder='Tournament description...'
              />
              <ErrorMessage>{errors?.description?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <div>
              <FormLabel>Date</FormLabel>
              <Input type='date' {...field} />
              <ErrorMessage>{errors?.date?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='time'
          render={({ field }) => (
            <div>
              <FormLabel>Time</FormLabel>
              <Input type='time' {...field} />
              <ErrorMessage>{errors?.time?.message}</ErrorMessage>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name='rounds'
          render={({ field }) => (
            <div>
              <FormLabel>Rounds</FormLabel>
              <Select value={field.value + ''} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder='Time' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='3'>3</SelectItem>
                  <SelectItem value='5'>5</SelectItem>
                  <SelectItem value='7'>7</SelectItem>
                  <SelectItem value='9'>9</SelectItem>
                  <SelectItem value='11'>11</SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage>{errors?.rounds?.message}</ErrorMessage>
            </div>
          )}
        />
        <Button className='w-full' type='submit' disabled={isSubmitting}>
          {isSubmitting && props.formType === 'ADD' && 'Creating tournament...'}
          {isSubmitting &&
            props.formType === 'EDIT' &&
            'Updating tournament...'}
          {!isSubmitting && props.formType === 'ADD' && 'Create tournament'}
          {!isSubmitting && props.formType === 'EDIT' && 'Update tournament'}
        </Button>
      </form>
    </Form>
  );
};

export default TournamentForm;
