import useUserQuery from '../hooks/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import Nav from '../components/features/nav/Nav';
import AppLayout from '../components/utils/AppLayout';
import { Card } from '../components/ui/card';
import ClubForm from '../components/forms/ClubForm';

const HomePage = () => {
  const { data, isFetching } = useUserQuery();

  if (isFetching && !data) return <LoadingScreen />;

  const isFirstCoordinatorLogin = data?.role === 'COORDINATOR' && !data?.club;

  return (
    <AppLayout>
      <Nav />
      <section
        className={`mt-16 p-2 w-full ${
          isFirstCoordinatorLogin && 'mt-0 flex-center h-screen'
        }`}
      >
        {isFirstCoordinatorLogin && (
          <Card className='p-4 w-[30rem]'>
            <h1 className='text-2xl uppercase font-bold'>Before we start</h1>
            <p className='text-sm text-gray-600 mb-4'>
              Welcome to the ChessMate! As a coordinator, you must first create
              your chess club before you can start using the app. Your club name
              must be unique and can't be changed later.
            </p>
            <ClubForm />
          </Card>
        )}
      </section>
    </AppLayout>
  );
};

export default HomePage;
