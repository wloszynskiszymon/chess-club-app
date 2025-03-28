import Nav from '@/features/nav/Nav';
import AppLayout from '../../components/utils/AppLayout';
import ClubMembersDashboard from './ClubMembersDashboard';
import { User } from '@/types/zod';
import { Club } from '@/features/data-table/columns/ClubListColumns';
import AppSection from '../../components/utils/AppSection';
import MailDashboard from '@/features/home-dashboard/MailDashboard';
import TournamentDashboard from './TournamentDashboard';
import Heading from '../../components/utils/Heading';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';

const HomePageView = ({ user }: { user: User }) => {
  return (
    <AppLayout>
      <Nav />
      <AppSection>
        <Card>
          <CardHeader className='flex-row justify-between'>
            <Heading className='block'>Welcome!</Heading>
            <Badge className='text-sm'>{user.club.name}</Badge>
          </CardHeader>
          <Separator />
          <CardContent className='flex flex-col md:flex-row justify-between gap-4 mt-6'>
            <article className='flex-1 flex flex-col gap-4'>
              <TournamentDashboard className='grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4' />
              <ClubMembersDashboard
                className='mt-8'
                club={user?.club as Club}
              />
            </article>
            <article>
              <MailDashboard />
            </article>
          </CardContent>
        </Card>
      </AppSection>
    </AppLayout>
  );
};

export default HomePageView;
