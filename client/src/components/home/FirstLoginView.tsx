import Nav from '@/features/nav/Nav';
import AppLayout from '../utils/AppLayout';
import CoordinatorClubCard from '../cards/CoordinatorClubCard';
import ChessPlayerClubCard from '../cards/ChessPlayerClubCard';
import CoordinatorOnly from '../utils/CoordinatorOnly';
import PlayerOnly from '../utils/PlayerOnly';
import AppSection from '../utils/AppSection';

const FirstLoginView = () => {
  return (
    <AppLayout>
      <Nav disabled />
      <AppSection className='flex justify-center'>
        <CoordinatorOnly>
          <CoordinatorClubCard />
        </CoordinatorOnly>

        <PlayerOnly>
          <ChessPlayerClubCard />
        </PlayerOnly>
      </AppSection>
    </AppLayout>
  );
};

export default FirstLoginView;
