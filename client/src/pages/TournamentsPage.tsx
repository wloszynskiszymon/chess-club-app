import AppLayout from '../components/utils/AppLayout';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '@/features/nav/Nav';
import Tournaments from '../components/tournaments/Tournaments';
import useTournamentsQuery from '@/hooks/queries/tournament/useTournamentsQuery';
import Heading from '../components/utils/Heading';
import { Button } from '../components/ui/button';
import TournamentSheet from '../components/tournaments/TournamentSheet';
import CoordinatorOnly from '../components/utils/CoordinatorOnly';
import AppSection from '@/components/utils/AppSection';
import HeadingDescription from '@/components/utils/HeadingDescription';

const TournamentsPage = () => {
  const { data: tournamentData, isLoading: isLoadingTournamentData } =
    useTournamentsQuery();

  if (isLoadingTournamentData || !tournamentData) return <LoadingScreen />;

  return (
    <AppLayout>
      <Nav />
      <AppSection>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <Heading>Tournaments</Heading>
            <HeadingDescription className='mb-4'>
              Here you can see all your tournaments.
            </HeadingDescription>
          </div>
          <CoordinatorOnly>
            <TournamentSheet formType='ADD'>
              <Button className='text-xs md:text-sm lg:text-md'>
                Create tournament
              </Button>
            </TournamentSheet>
          </CoordinatorOnly>
        </div>
        <Tournaments tournaments={tournamentData} />
      </AppSection>
    </AppLayout>
  );
};

export default TournamentsPage;
