import { Separator } from '@/components/ui/separator';
import { Message } from '@/types/mail';
import moment from 'moment';

const MailDetailsContent = ({ mail }: { mail: Message }) => {
  return (
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
  );
};

export default MailDetailsContent;
