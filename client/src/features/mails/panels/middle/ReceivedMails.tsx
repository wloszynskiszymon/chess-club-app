import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import MailsList from './MailsList';
import { MiddlePanelProps } from './MiddlePanel';
import MailListSkeleton from '@/features/mails/components/skeleton/MailListSkeleton';

// URL: /mail/received
const ReceivedMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ filter: 'received' });
  if (!data) return <MailListSkeleton amount={5} />;
  return <MailsList mails={data} {...props} />;
};

export default ReceivedMails;
