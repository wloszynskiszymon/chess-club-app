import MailForm from '@/components/forms/MailForm';
import MailDetails from './MailDetails';
import useMailUrl from '@/features/mails/hooks/useMailUrl';

const RightPanel = () => {
  const { isNewMail } = useMailUrl();

  if (isNewMail) return <MailForm className='p-4' />;
  else return <MailDetails />;
};

export default RightPanel;
