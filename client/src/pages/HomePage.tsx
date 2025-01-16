import useUserQuery from '../hooks/queries/useUserQuery';
import LoadingScreen from '../components/utils/LoadingScreen';

import Nav from '../components/utils/Nav';
import AppLayout from '../components/utils/AppLayout';
import { Club } from '../components/features/data-table/columns/ClubListColumns';
import CoordinatorClubCard from '../components/cards/CoordinatorClubCard';
import useClubsQuery from '../hooks/queries/useClubQuery';
import ChessPlayerClubCard from '../components/cards/ChessPlayerClubCard';
import MembersCard from '../components/cards/MembersCard';
import { User } from '../types/zod';
import { Card } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const { data: userData, isLoading: isLoadingUserData } = useUserQuery();
  const { data: clubsData, isLoading: isLoadingClubsData } = useClubsQuery();

  if (isLoadingUserData || !userData || isLoadingClubsData || !clubsData)
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
        className={`pt-16 px-4 w-full flex ${
          isFirstLogin ? 'mt-0 flex-center h-screen' : ''
        }`}
      >
        {isFirstCoordinatorLogin && <CoordinatorClubCard />}
        {isFirstChessPlayerLogin && (
          <ChessPlayerClubCard data={clubsData as Club[]} />
        )}

        {!isFirstCoordinatorLogin && !isFirstChessPlayerLogin && (
          <>
            <div className='w-4/5'>
              <Card className='p-4 w-1/3'>
                <Link
                  to='/tournaments'
                  className='font-bold text-xl uppercase text-gray-800 hover:underline'
                >
                  Tournaments
                </Link>
                <p className='text-gray-600'>
                  Here you can create and manage tournaments for your club.
                </p>
                <Button className='block' variant='outline'>
                  <Link to='/tournaments'>Create tournament</Link>
                </Button>
                <h2 className='text-md font-bold mt-4 text-gray-800'>
                  Upcoming tournaments
                </h2>
                <p className='text-sm'>No tournaments found.</p>
              </Card>
            </div>
            <aside className='w-1/5'>
              <MembersCard members={userData?.club.members as User[]} />
            </aside>
          </>
        )}
      </section>
    </AppLayout>
  );
};

export default HomePage;
