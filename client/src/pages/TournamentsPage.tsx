import AppLayout from '../components/utils/AppLayout';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '../components/utils/Nav';
import Tournaments from '../components/utils/Tournaments';
import useTournamentsQuery from '../hooks/queries/useTournamentsQuery';
import Heading from '../components/utils/Heading';
import { Button } from '../components/ui/button';
import TournamentSheet from '../components/utils/TournamentSheet';

const TournamentsPage = () => {
  const { data: tournamentData, isFetching: isFetchingTournamentData } =
    useTournamentsQuery();

  if (isFetchingTournamentData && !tournamentData) return <LoadingScreen />;

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
          <TournamentSheet formType='ADD'>
            <Button>Create tournament</Button>
          </TournamentSheet>
        </div>

        {tournamentData && <Tournaments tournaments={tournamentData} />}
      </section>
    </AppLayout>
  );
};

export default TournamentsPage;
