import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';

const SentMails = (props: MiddlePanelProps) => {
  const { data, isLoading } = useMessagesQuery({ filter: 'sent' });
  return <MailsList mails={data || []} isLoading={isLoading} {...props} />;
};

export default SentMails;
