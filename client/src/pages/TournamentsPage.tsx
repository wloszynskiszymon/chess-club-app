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
      <section className='pt-24 mx-20'>
        <div className='flex justify-between items-center '>
          <div>
            <Heading>Tournaments</Heading>
            <p className='text-muted-foreground mb-4'>
              Here you can see all your tournaments.
            </p>
          </div>
          <CoordinatorOnly>
            <TournamentSheet formType='ADD'>
              <Button>Create tournament</Button>
            </TournamentSheet>
          </CoordinatorOnly>
        </div>

        <Tournaments tournaments={tournamentData} />
      </section>
    </AppLayout>
  );
};

export default TournamentsPage;
