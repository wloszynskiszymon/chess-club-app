import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import MailsList from './MailsList';
import { MiddlePanelProps } from './MiddlePanel';

// URL: /mail/received
const ReceivedMails = (props: MiddlePanelProps) => {
  const { data, isLoading } = useMessagesQuery({ filter: 'received' });
  return <MailsList mails={data || []} isLoading={isLoading} {...props} />;
};

export default ReceivedMails;
