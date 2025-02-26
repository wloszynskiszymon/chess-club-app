import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';

const SavedMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ type: 'saved' });
  return <MailsList mails={data} {...props} />;
};

export default SavedMails;
