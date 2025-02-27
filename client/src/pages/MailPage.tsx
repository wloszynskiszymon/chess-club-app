import AppLayout from '@/components/utils/AppLayout';
import Nav from '@/features/nav/Nav';

import Mail from '@/features/mails/Mail';

const MailPage = () => {
  return (
    <AppLayout>
      <Nav />
      <section className={`pt-24 w-full px-10 h-[90vh]`}>
        <Mail />
      </section>
    </AppLayout>
  );
};

export default MailPage;
