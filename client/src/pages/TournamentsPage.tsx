import TournamentForm from '../components/forms/TournamentForm';
import AppLayout from '../components/utils/AppLayout';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '../components/utils/Nav';
import useUserQuery from '../hooks/useUserQuery';

const TournamentsPage = () => {
  const { data: userData, isFetching: isFetchingUserData } = useUserQuery();

  if (isFetchingUserData && !userData) return <LoadingScreen />;

  return (
    <AppLayout>
      <Nav />
      <section className='px-4 pt-24 flex gap-2'>
        <div className='w-4/5'>
          <h1 className='text-2xl font-bold uppercase text-gray-800 mb-4'>
            TOURNMANETS
          </h1>

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
