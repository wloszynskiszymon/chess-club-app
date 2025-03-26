import Nav from '@/features/nav/Nav';
import AppLayout from '../utils/AppLayout';
import ClubInfo from '../cards/ClubInfo';
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
      <AppSection className=' flex justify-between gap-4'>
        <article>
          <Heading className='mb-2'>Dashboards</Heading>
          <HeadingDescription className='mb-6'>
            See all upcoming events!
          </HeadingDescription>
        </article>
        <article className='[&>*]:rounded-md'>
          <ClubInfo
            className='mb-8 hover:bg-gray-100 '
            club={user?.club as Club}
          />
          <MailAside />
        </article>
      </AppSection>
    </AppLayout>
  );
};

export default HomePageView;
