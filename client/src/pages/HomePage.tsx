import useUserQuery from '../hooks/queries/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import Nav from '@/features/nav/Nav';
import AppLayout from '../components/utils/AppLayout';
import CoordinatorClubCard from '../components/cards/CoordinatorClubCard';
import ChessPlayerClubCard from '../components/cards/ChessPlayerClubCard';
import MembersCard from '../components/cards/MembersCard';
import { Club } from '@/features/data-table/columns/ClubListColumns';

const HomePage = () => {
  const { data: userData, isLoading: isLoadingUserData } = useUserQuery();

  if (isLoadingUserData || !userData) return <LoadingScreen />;

  const isFirstCoordinatorLogin =
    userData?.role === 'COORDINATOR' && !userData?.club;
  const isFirstChessPlayerLogin =
    userData?.role === 'CHESS_PLAYER' && !userData?.club;
  const isFirstLogin = isFirstCoordinatorLogin || isFirstChessPlayerLogin;

  return (
    <AppLayout>
      <Nav disabled={isFirstCoordinatorLogin || isFirstChessPlayerLogin} />
      <section
        className={`pt-16 px-4 w-full flex ${
          isFirstLogin ? 'mt-0 flex-center h-screen' : ''
        }`}
      >
        {isFirstCoordinatorLogin && <CoordinatorClubCard />}
        {isFirstChessPlayerLogin && <ChessPlayerClubCard />}

        {!isFirstCoordinatorLogin && !isFirstChessPlayerLogin && (
          <div className='mx-20 mt-10'>
            <MembersCard club={userData?.club as Club} />
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default HomePage;
