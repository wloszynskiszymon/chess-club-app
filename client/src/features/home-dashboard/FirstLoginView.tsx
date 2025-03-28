import ChessPlayerClubCard from '@/components/cards/ChessPlayerClubCard';
import CoordinatorClubCard from '@/components/cards/CoordinatorClubCard';
import AppLayout from '@/components/utils/AppLayout';
import AppSection from '@/components/utils/AppSection';
import CoordinatorOnly from '@/components/utils/CoordinatorOnly';
import PlayerOnly from '@/components/utils/PlayerOnly';
import Nav from '@/features/nav/Nav';

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
