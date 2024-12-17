import useUserQuery from '../hooks/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import Nav from '../components/utils/Nav';
import AppLayout from '../components/utils/AppLayout';
import { Club } from '../components/features/data-table/Columns';
import CoordinatorClubCard from '../components/cards/CoordinatorClubCard';
import useClubsQuery from '../hooks/useClubQuery';
import ChessPlayerClubCard from '../components/cards/ChessPlayerClubCard';

const HomePage = () => {
  const { data: userData, isFetching: isFetchingUserData } = useUserQuery();
  const { data: clubsData, isFetching: isFetchingClubsData } = useClubsQuery();

  if ((isFetchingUserData && !userData) || (isFetchingClubsData && !clubsData))
    return <LoadingScreen />;

  const isFirstCoordinatorLogin =
    userData?.role === 'COORDINATOR' && !userData?.club;
  const isFirstChessPlayerLogin =
    userData?.role === 'CHESS_PLAYER' && !userData?.club;
  const isFirstLogin = isFirstCoordinatorLogin || isFirstChessPlayerLogin;

  return (
    <AppLayout>
      <Nav />
      <section
        className={`mt-16 p-2 w-full ${
          isFirstLogin && 'mt-0 flex-center h-screen'
        }`}
      >
        {isFirstCoordinatorLogin && <CoordinatorClubCard />}
        {isFirstChessPlayerLogin && (
          <ChessPlayerClubCard data={clubsData as Club[]} />
        )}
      </section>
    </AppLayout>
  );
};

export default HomePage;
