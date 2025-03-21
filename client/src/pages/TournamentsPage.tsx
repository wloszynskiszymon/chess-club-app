import AppLayout from '../components/utils/AppLayout';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '@/features/nav/Nav';
import Tournaments from '../components/utils/Tournaments';
import useTournamentsQuery from '@/hooks/queries/tournament/useTournamentsQuery';
import Heading from '../components/utils/Heading';
import { Button } from '../components/ui/button';
import TournamentSheet from '../components/utils/TournamentSheet';
import CoordinatorOnly from '../components/utils/CoordinatorOnly';

const TournamentsPage = () => {
  const { data: tournamentData, isLoading: isLoadingTournamentData } =
    useTournamentsQuery();

  if (isLoadingTournamentData || !tournamentData) return <LoadingScreen />;

  return (
    <AppLayout>
      <Nav />
      <section className='mx-3  md:mx-8 lg:mx-12 pt-24 xl:mx-20'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <Heading>Tournaments</Heading>
            <p className='text-muted-foreground mb-4 text-xs md:text-sm lg:text-md'>
              Here you can see all your tournaments.
            </p>
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
      </section>
    </AppLayout>
  );
};

export default TournamentsPage;
