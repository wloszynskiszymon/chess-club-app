import AppLayout from '@/components/utils/AppLayout';
import Nav from '@/features/nav/Nav';

import Mail from '@/features/mails/Mail';
import AppSection from '@/components/utils/AppSection';

const MailPage = () => {
  return (
    <AppLayout className='overflow-y-hidden'>
      <Nav />
      <AppSection className='min-w-[900px] h-[90vh] overflow-hidden bg-gray-50'>
        <Mail />
      </AppSection>
    </AppLayout>
  );
};

export default MailPage;
