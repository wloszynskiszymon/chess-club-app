import TournamentForm from '../components/forms/TournamentForm';
import AppLayout from '../components/utils/AppLayout';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '../components/utils/Nav';
import Tournaments from '../components/utils/Tournaments';
import useTournamentsQuery from '../hooks/useTournamentsQuery';
import Heading from '../components/utils/Heading';

const TournamentsPage = () => {
  const { data: tournamentData, isFetching: isFetchingTournamentData } =
    useTournamentsQuery();

  if (isFetchingTournamentData && !tournamentData) return <LoadingScreen />;

  return (
    <AppLayout>
      <Nav />
      <section className='px-4 pt-24 flex gap-2'>
        <aside className='w-1/5 border-r-2 p-2 pr-8'>
          <h2 className='text-lg font-bold uppercase text-gray-800 text-center'>
            Create tournament
          </h2>
          <TournamentForm />
        </aside>
        <article className='w-4/5 pl-8'>
          <Heading className='mb-4'>Tournaments</Heading>
          {tournamentData && <Tournaments tournaments={tournamentData} />}
        </article>
      </section>
    </AppLayout>
  );
};

export default TournamentsPage;
