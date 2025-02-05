import { Separator } from '@/components/ui/separator';
import MailSectionHeading from '../MailSectionHeading';
import MailSectionHeader from '../MailSectionHeader';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MailContent } from '@/types/mail';
import { useParams } from 'react-router-dom';

const MailDetails = ({ mails }: { mails: MailContent[] }) => {
  const { mailId } = useParams();
  const mail = mails.find(mail => mail.id === mailId);

  console.log(mail);

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
      <MailSectionHeader className='justify-between'>
        <MailSectionHeading>Mail</MailSectionHeading>
        <Button variant='destructive' size='sm' className=' mr-4'>
          <TrashIcon className='h-6 w-6' />
        </Button>
      </MailSectionHeader>

      <Separator />

      <article className='flex-1 p-4'>
        <div className='w-full'>
          <div className='flex w-full justify-between items-center'>
            <h3 className='text-2xl font-bold mb-3'>{mail.subject} </h3>
            <p className='text-sm text-muted-foreground'>{mail.date}</p>
          </div>
          <p className='text-sm text-muted-foreground'>
            From:
            <span className='font-bold text-md ml-2'>{mail.from}</span>
          </p>
          <p className='text-sm text-muted-foreground'>
            To:
            <span className='font-bold text-md ml-2'>
              Jane Doe, Maria Smith and 4+ more
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
