import TournamentCard from '../components/cards/TournamentCard';
import TournamentForm from '../components/forms/TournamentForm';
import AppLayout from '../components/utils/AppLayout';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '../components/utils/Nav';
import useTournamentsQuery from '../hooks/useTournamentsQuery';
import useUserQuery from '../hooks/useUserQuery';

const TournamentsPage = () => {
  const { data: userData, isFetching: isFetchingUserData } = useUserQuery();
  const { data: tournamentData, isFetching: isFetchingTournamentData } =
    useTournamentsQuery();

  if (
    isFetchingUserData &&
    !userData &&
    isFetchingTournamentData &&
    !tournamentData
  )
    return <LoadingScreen />;

  console.log(tournamentData);

  return (
    <AppLayout>
      <Nav />
      <section className='px-4 pt-24 flex gap-2'>
        <div className='w-4/5'>
          <h1 className='text-2xl font-bold uppercase text-gray-800 mb-4'>
            TOURNMANETS
          </h1>

          {tournamentData?.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}

          <div className='grid grid-cols-3'>
            <p>No tournaments scheduled.</p>
          </div>
        </div>

        <aside className='w-1/5 border-l-2 p-2 pl-8'>
          <h2 className='text-lg font-bold uppercase text-gray-800 text-center'>
            Create tournament
          </h2>
          <TournamentForm />
        </aside>
      </section>
    </AppLayout>
  );
};

export default TournamentsPage;
