import Nav from '@/features/nav/Nav';
import AppLayout from '../utils/AppLayout';
import ClubInfo from '../cards/ClubInfo';
import { User } from '@/types/zod';
import { Club } from '@/features/data-table/columns/ClubListColumns';
import AppSection from '../utils/AppSection';
import HeadingDescription from '../utils/HeadingDescription';
import MailAside from '@/features/mails/components/MailAside';
import TournamentDashboard from './TournamentDashboard';
import HeadingSecondary from '../utils/HeadingSecondary';
import Heading from '../utils/Heading';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const HomePageView = ({ user }: { user: User }) => {
  return (
    <AppLayout>
      <Nav />
      <AppSection>
        <Card>
          <CardHeader className='flex-row justify-between'>
            <Heading className='block'>Welcome!</Heading>
            <div>
              <Badge className='text-sm'>{user.club.name}</Badge>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className='flex justify-between gap-4 mt-6'>
            <article className='flex-1 flex flex-col gap-4'>
              <div>
                <HeadingSecondary className='mb-2'>
                  Tournaments
                </HeadingSecondary>
                <HeadingDescription>
                  See some of the upcoming tournaments and their details.
                </HeadingDescription>
              </div>

              <TournamentDashboard />

              <Button className='mt-4 self-center' variant='ghost'>
                <Link
                  className='text-center underline underline-offset-2 text-sm'
                  to='/tournaments'
                >
                  See more tournaments
                </Link>
              </Button>

              <ClubInfo className='mt-8' club={user?.club as Club} />
            </article>

            <article className='[&>*]:rounded-md'>
              <MailAside />
            </article>
          </CardContent>
        </Card>
      </AppSection>
    </AppLayout>
  );
};

export default HomePageView;
