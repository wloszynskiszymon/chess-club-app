import useMailsQuery from '@/hooks/queries/mail/useMailsQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';

const SavedMails = (props: MiddlePanelProps) => {
  const { data, isLoading } = useMailsQuery({ filter: 'saved' });
  return <MailsList mails={data || []} isLoading={isLoading} {...props} />;
};

export default SavedMails;
