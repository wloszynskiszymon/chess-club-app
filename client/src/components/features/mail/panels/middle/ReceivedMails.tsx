import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import MailsList from './MailsList';
import { MiddlePanelProps } from './MiddlePanel';

// URL: /mail/received
const ReceivedMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ type: 'received' });
  if (!data) return <p>No content</p>;
  return <MailsList mails={data} {...props} />;
};

export default ReceivedMails;
