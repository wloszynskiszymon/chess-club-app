import useUserQuery from '../hooks/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import Nav from '../components/features/nav/Nav';
import AppLayout from '../components/utils/AppLayout';

const HomePage = () => {
  const { data, isFetching } = useUserQuery();

  if (isFetching && !data) return <LoadingScreen />;

  return (
    <AppLayout>
      <Nav />

      <p>
        {data?.role === 'COORDINATOR' &&
          !data?.club &&
          'You need to create a club bro'}
      </p>
      <p>
        {data?.role === 'CHESS_PLAYER' &&
          !data?.club &&
          'You need to join a club bro'}
      </p>
    </AppLayout>
  );
};

export default HomePage;
