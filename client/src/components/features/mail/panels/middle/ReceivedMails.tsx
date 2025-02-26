import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import MailsList from './MailsList';
import { MiddlePanelProps } from './MiddlePanel';

// URL: /mail/inbox
const ReceivedMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ type: 'received' });
  return <MailsList mails={data} {...props} />;
};

export default ReceivedMails;
