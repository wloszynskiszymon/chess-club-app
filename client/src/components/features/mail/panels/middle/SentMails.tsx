import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';

const SentMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ type: 'sent' });
  return <MailsList mails={data} {...props} />;
};

export default SentMails;
