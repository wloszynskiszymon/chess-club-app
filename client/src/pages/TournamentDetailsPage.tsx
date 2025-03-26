import { useParams } from 'react-router-dom';
import AppLayout from '../components/utils/AppLayout';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '@/features/nav/Nav';
import { Tournament } from '../types/server';
import TournamentParticipantsTableForm from '../components/forms/TournamentParticipantsTableForm';
import useTournamentQuery from '@/hooks/queries/tournament/useTournamentQuery';
import PlayerOnly from '../components/utils/PlayerOnly';
import CoordinatorOnly from '../components/utils/CoordinatorOnly';
import ParticipantResults from '../components/tournaments/ParticipantResults';
import useUserResultsQuery from '@/hooks/queries/user/useUserResultsQuery';
import TournamentDetailsHeader from '@/components/tournaments/TournamentDetailsHeader';
import AppSection from '@/components/utils/AppSection';

const TournamentDetailsPage = () => {
  const params = useParams();
  const { data: tournamentData, isLoading: isLoadingTournamentData } =
    useTournamentQuery(params.tournamentId as string);
  const { data: resultData, isLoading: isLoadingResultsData } =
    useUserResultsQuery(params.tournamentId as string);

  if (isLoadingTournamentData || !tournamentData || isLoadingResultsData)
    return <LoadingScreen />;

  return (
    <AppLayout>
      <Nav />
      <AppSection className='flex flex-col gap-2'>
        <TournamentDetailsHeader tournament={tournamentData as Tournament} />

        <CoordinatorOnly>
          <TournamentParticipantsTableForm tournament={tournamentData} />
        </CoordinatorOnly>

        <PlayerOnly>
          {resultData ? (
            <ParticipantResults tournamentResults={resultData} />
          ) : (
            <p className='text-muted-foreground text-center text-xs md:text-sm lg:text-md'>
              You did not participate in this tournament.
            </p>
          )}
        </PlayerOnly>
      </AppSection>
    </AppLayout>
  );
};

export default TournamentDetailsPage;
