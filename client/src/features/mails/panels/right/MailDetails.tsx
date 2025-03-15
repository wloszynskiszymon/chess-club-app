import useMailUrl from '@/features/mails/hooks/useMailUrl';
import useMailDetailsQuery from '@/hooks/queries/mail/useMailDetailsQuery';
import useMarkMailAsRead from '@/features/mails/hooks/useMarkMailAsRead';
import MailDetailsLayout from './MailDetailsLayout';
import MailDetailsContent from './MailDetailsContent';
import MailDetailsContentSkeleton from '../../components/skeleton/MailDetailsContentSkeleton';

const MailDetails = () => {
  const { mailId } = useMailUrl();
  const { data: mailDetails, isLoading } = useMailDetailsQuery(
    mailId as string,
    { enabled: !!mailId }
  );
  useMarkMailAsRead(mailDetails);

  if (isLoading)
    return (
      <MailDetailsLayout renderSkeleton>
        <MailDetailsContentSkeleton />
      </MailDetailsLayout>
    );

  if (!mailDetails)
    return (
      <MailDetailsLayout>
        <p className='text-sm text-muted-foreground text-center mt-4'>
          No content.
        </p>
      </MailDetailsLayout>
    );

  return (
    <MailDetailsLayout mail={mailDetails}>
      <MailDetailsContent mail={mailDetails} />
    </MailDetailsLayout>
  );
};

export default MailDetails;
