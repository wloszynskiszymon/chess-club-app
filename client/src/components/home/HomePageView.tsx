import Nav from '@/features/nav/Nav';
import AppLayout from '../utils/AppLayout';
import MembersCard from '../cards/MembersCard';
import { User } from '@/types/zod';
import { Club } from '@/features/data-table/columns/ClubListColumns';
import AppSection from '../utils/AppSection';

const HomePageView = ({ user }: { user: User }) => {
  return (
    <AppLayout>
      <Nav />
      <AppSection className='flex'>
        <MembersCard club={user?.club as Club} />
      </AppSection>
    </AppLayout>
  );
};

export default HomePageView;
