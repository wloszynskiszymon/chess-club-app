import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { MiddlePanelProps } from './MiddlePanel';
import MailsList from './MailsList';
import MailListSkeleton from '@/features/mails/components/skeleton/MailListSkeleton';

const SentMails = (props: MiddlePanelProps) => {
  const { data } = useMessagesQuery({ filter: 'sent' });
  if (!data) return <MailListSkeleton amount={5} />;
  return <MailsList mails={data} {...props} />;
};

export default SentMails;
