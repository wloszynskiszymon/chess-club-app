import useMailsQuery from '@/hooks/queries/mail/useMailsQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';

const SentMails = (props: MiddlePanelProps) => {
  const { data, isLoading } = useMailsQuery({ filter: 'sent' });
  return <MailsList mails={data || []} isLoading={isLoading} {...props} />;
};

export default SentMails;
