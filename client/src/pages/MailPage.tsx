import AppLayout from '@/components/utils/AppLayout';
import Nav from '@/components/features/nav/Nav';

const MailPage = () => {
  return (
    <AppLayout>
      <Nav />
      <section className={`pt-16 px-4 w-full flex`}>
        <div>Messages</div>
      </section>
    </AppLayout>
  );
};

export default MailPage;
