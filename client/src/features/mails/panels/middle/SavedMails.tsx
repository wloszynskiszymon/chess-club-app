import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';

const SavedMails = (props: MiddlePanelProps) => {
  const { data, isLoading } = useMessagesQuery({ filter: 'saved' });
  return <MailsList mails={data || []} isLoading={isLoading} {...props} />;
};

export default SavedMails;
