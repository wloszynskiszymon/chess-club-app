import MailForm from '@/components/forms/MailForm';
import MailDetails from './MailDetails';
import useMailUrl from '@/components/features/mail/hooks/useMailUrl';

const RightPanel = () => {
  const { isNewMail } = useMailUrl();

  return (
    <>
      {!isNewMail && <MailDetails />}
      {isNewMail && <MailForm className='p-4' />}
    </>
  );
};

export default RightPanel;
