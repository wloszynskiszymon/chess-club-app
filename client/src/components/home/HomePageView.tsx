import Nav from '@/features/nav/Nav';
import AppLayout from '../utils/AppLayout';
import MembersCard from '../cards/MembersCard';
import { User } from '@/types/zod';
import { Club } from '@/features/data-table/columns/ClubListColumns';
import AppSection from '../utils/AppSection';
import Heading from '../utils/Heading';
import HeadingDescription from '../utils/HeadingDescription';
import MailAside from '@/features/mails/components/MailAside';

const HomePageView = ({ user }: { user: User }) => {
  return (
    <AppLayout>
      <Nav />
      <AppSection>
        <Heading className='mb-2'>Dashboards</Heading>
        <HeadingDescription>See all upcoming events!</HeadingDescription>
        <article className='w-full flex gap-4 justify-between'>
          <MembersCard club={user?.club as Club} />
          <MailAside className='min-w-40' />
        </article>
      </AppSection>
    </AppLayout>
  );
};

export default HomePageView;
