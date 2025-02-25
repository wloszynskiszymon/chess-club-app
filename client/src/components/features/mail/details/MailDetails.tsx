import { Separator } from '@/components/ui/separator';
import MailSectionHeading from '../MailSectionHeading';
import MailSectionHeader from '../MailSectionHeader';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/mail';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import SaveButton from '../buttons/SaveButton';

const MailDetails = ({ mails }: { mails: Message[] }) => {
  const { mailId } = useParams();
  const mail = mails.find(mail => mail.id === mailId);

  if (!mail) {
    return (
      <section>
        <article className='flex-1 p-4'>
          <p className='text-sm text-muted-foreground text-center'>
            No content.
          </p>
        </article>
      </section>
    );
  }

  return (
    <section>
      <MailSectionHeader className='flex justify-between items-center'>
        <MailSectionHeading>Content of your mail</MailSectionHeading>

        <div className='flex justify-between items-center'>
          <SaveButton mail={mail} />
          <Button variant='destructive' size='sm' className=' mr-4'>
            <TrashIcon className='h-6 w-6' />
          </Button>
        </div>
      </MailSectionHeader>

      <Separator />

      <article className='flex-1 p-4'>
        <div className='w-full'>
          <div className='flex w-full justify-between items-center'>
            <h3 className='text-2xl font-bold mb-3'>{mail.subject} </h3>
            <p className='text-sm text-muted-foreground'>
              {moment(mail.createdAt).format('DD-MM-YYYY')}
            </p>
          </div>
          <p className='text-sm text-muted-foreground'>
            From:
            <span className='font-bold text-md ml-2'>{mail.sender.email}</span>
          </p>
          <p className='text-sm text-muted-foreground'>
            To:
            <span className='font-bold text-md ml-2'>
              {mail.recipients[0].recipient.email}
            </span>
          </p>
        </div>

        <Separator orientation='horizontal' className='mt-2 mb-4' />

        <p className='text-sm whitespace-pre-wrap'>{mail.body}</p>
      </article>
    </section>
  );
};

export default MailDetails;
