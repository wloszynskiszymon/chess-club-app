import AppLayout from '@/components/utils/AppLayout';
import Nav from '@/components/features/nav/Nav';

import Mail from '@/components/features/mail/Mail';

const MailPage = () => {
  return (
    <AppLayout>
      <Nav />
      <section className={`pt-24 w-full flex px-10`}>
        <Mail />
      </section>
    </AppLayout>
  );
};

export default MailPage;
