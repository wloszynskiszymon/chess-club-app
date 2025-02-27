import { Form, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import ErrorMessage from '../utils/ErrorMessage';
import { Button } from '../ui/button';
import useMailForm from '@/hooks/forms/useMailForm';
import { Textarea } from '../ui/textarea';
import MailSectionHeader from '../features/mail/components/MailSectionHeader';
import MailSectionHeading from '../features/mail/components/MailSectionHeading';
import { Separator } from '../ui/separator';

const MailForm = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLFormElement>) => {
  const { form, handleSubmit } = useMailForm();
  const { errors, isSubmitting } = form.formState;

  return (
    <section className='flex flex-col w-full h-full'>
      <MailSectionHeader className='justify-between flex-shrink-0'>
        <MailSectionHeading>Write new mail</MailSectionHeading>
      </MailSectionHeader>

      <Separator />

      <Form {...form}>
        <form
          className={`flex flex-col gap-2 w-full h-full ${className}`}
          {...props}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name='to'
            render={({ field }) => (
              <div className='flex-center gap-2'>
                <FormLabel className='h-8 w-20 inline-flex items-center justify-center border border-gray-300 rounded-md'>
                  To:
                </FormLabel>
                <Input {...field} type='email' placeholder='Mail to...' />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name='subject'
            render={({ field }) => (
              <div className='flex-center gap-2'>
                <FormLabel className='h-8 w-20 inline-flex items-center justify-center border border-gray-300 rounded-md'>
                  Subject:
                </FormLabel>
                <Input {...field} type='text' placeholder='Mail subject...' />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <div className='w-full h-full flex-1'>
                <Textarea
                  {...field}
                  className='w-full h-full resize-none'
                  placeholder='Your mail...'
                ></Textarea>
              </div>
            )}
          />

          <ErrorMessage>
            {errors?.root?.message || errors?.body?.message}
          </ErrorMessage>

          <Button
            className='self-end px-6'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send mail'}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default MailForm;
