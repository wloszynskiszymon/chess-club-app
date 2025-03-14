import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';
import MailListSkeleton from '@/features/mails/components/skeleton/MailListSkeleton';

const SavedMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ type: 'saved' });
  if (!data) return <MailListSkeleton amount={10} />;
  return <MailsList mails={data} {...props} />;
};

export default SavedMails;
