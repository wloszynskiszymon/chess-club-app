import useMailsQuery from '@/hooks/queries/mail/useMailsQuery';
import MailsList from './MailsList';
import { MiddlePanelProps } from './MiddlePanel';

// URL: /mail/received
const ReceivedMails = (props: MiddlePanelProps) => {
  const { data, isLoading } = useMailsQuery({ filter: 'received' });
  return <MailsList mails={data || []} isLoading={isLoading} {...props} />;
};

export default ReceivedMails;
