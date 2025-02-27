import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';

const SavedMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ type: 'saved' });
    if (!data) return <p>No content</p>;
  return <MailsList mails={data} {...props} />;
};

export default SavedMails;
