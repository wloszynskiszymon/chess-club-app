import AppLayout from '@/components/utils/AppLayout';
import Nav from '@/features/nav/Nav';

import Mail from '@/features/mails/Mail';

const MailPage = () => {
  return (
    <AppLayout className='overflow-y-hidden'>
      <Nav />
      <section className='pt-24 min-w-[900px] w-full px-2 sm:px-6 md:px-10 h-[90vh] overflow-hidden  bg-gray-50'>
        <Mail />
      </section>
    </AppLayout>
  );
};

export default MailPage;
