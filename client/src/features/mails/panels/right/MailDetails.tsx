import { Separator } from '@/components/ui/separator';
import MailSectionHeading from '../../components/MailSectionHeading';
import MailSectionHeader from '../../components/MailSectionHeader';
import moment from 'moment';
import SaveButton from './SaveButton';
import useMailUrl from '@/features/mails/hooks/useMailUrl';
import useMailDetailsQuery from '@/hooks/queries/useMailDetailsQuery';
import useMarkMailAsRead from '@/features/mails/hooks/useMarkMailAsRead';

const MailDetails = () => {
  const { category, mailId } = useMailUrl();
  const { data: mailDetails, isLoading } = useMailDetailsQuery(
    mailId as string,
    { enabled: !!mailId }
  );
  useMarkMailAsRead(mailDetails);

  if (isLoading) {
    return (
      <section>
        <article className='flex-1 p-4'>
          <p className='text-sm text-muted-foreground text-center'>
            Loading...
          </p>
        </article>
      </section>
    );
  }

  if (!mailDetails) {
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
          {category !== 'sent' && <SaveButton mail={mailDetails} />}
        </div>
      </MailSectionHeader>

      <Separator />

      <article className='flex-1 p-4'>
        <div className='w-full'>
          <div className='flex w-full justify-between items-center'>
            <h3 className='text-2xl font-bold mb-3'>{mailDetails.subject} </h3>
            <p className='text-sm text-muted-foreground'>
              {moment(mailDetails.createdAt).format('DD-MM-YYYY')}
            </p>
          </div>
          <p className='text-sm text-muted-foreground'>
            From:
            <span className='font-bold text-md ml-2'>
              {mailDetails.sender.email}
            </span>
          </p>
          <p className='text-sm text-muted-foreground'>
            To:
            <span className='font-bold text-md ml-2'>
              {mailDetails.recipients[0].recipient.email}
            </span>
          </p>
        </div>

        <Separator orientation='horizontal' className='mt-2 mb-4' />

        <p className='text-sm whitespace-pre-wrap'>{mailDetails.body}</p>
      </article>
    </section>
  );
};

export default MailDetails;
