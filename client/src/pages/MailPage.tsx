import AppLayout from '@/components/utils/AppLayout';
import Nav from '@/features/nav/Nav';

import Mail from '@/features/mails/Mail';

const MailPage = () => {
  return (
    <AppLayout>
      <Nav />
      <section className='pt-24 min-w-[900px] w-full px-2 sm:px-6 md:px-10 min-h-[700px] h-[90vh] overflow-auto bg-gray-50'>
        <Mail />
      </section>
    </AppLayout>
  );
};

export default MailPage;
