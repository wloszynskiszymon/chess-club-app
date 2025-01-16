import { useParams } from 'react-router-dom';
import AppLayout from '../components/utils/AppLayout';
import Heading from '../components/utils/Heading';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '../components/utils/Nav';
import { Badge } from '../components/ui/badge';
import moment from 'moment';
import { Button } from '../components/ui/button';
import { Trash } from 'lucide-react';
import TournamentSheet from '../components/utils/TournamentSheet';
import { Tournament } from '../types/server';
import TournamentDeleteButton from '../components/buttons/TournamentDeleteButton';
import TournamentParticipantsTableForm from '../components/forms/TournamentParticipantsTableForm';
import useTournamentQuery from '../hooks/queries/useTournamentQuery';
import PlayerOnly from '../components/utils/PlayerOnly';
import CoordinatorOnly from '../components/utils/CoordinatorOnly';
import ParticipantResults from '../components/utils/ParticipantResults';
import useUserResultsQuery from '../hooks/queries/useUserResultsQuery';

const TournamentDetailsPage = () => {
  const params = useParams();
  const { data: tournamentData, isFetching: isFetchingTournamentData } =
    useTournamentQuery(params.tournamentId as string);
  const { data: resultData, isFetching: isFetchingResultsData } =
    useUserResultsQuery(params.tournamentId as string);

  if (
    (isFetchingTournamentData && !tournamentData) ||
    (isFetchingResultsData && !resultData)
  )
    return <LoadingScreen />;

  const date = moment(tournamentData?.date).format('DD.MM.YYYY');
  const time = moment(tournamentData?.time).format('HH:MM');

  return (
    <AppLayout>
      <Nav />
      <section className='px-4 pt-24 flex gap-2'>
        <article className='w-full  mx-20'>
          <div className='flex justify-between items-center'>
            <Heading className='inline-flex mb-2'>
              {tournamentData?.title}
            </Heading>
            <CoordinatorOnly>
              <aside className='flex-center gap-2'>
                <TournamentSheet
                  formType='EDIT'
                  tournament={tournamentData as Tournament}
                >
                  <Button variant='outline'>Edit details</Button>
                </TournamentSheet>
                <TournamentDeleteButton
                  tournamentId={tournamentData?.id as string}
                >
                  <Trash />
                </TournamentDeleteButton>
              </aside>
            </CoordinatorOnly>
          </div>
          <div className='flex gap-2 w-full mb-4'>
            <Badge>{date}</Badge>
            <Badge>{time}</Badge>
            <Badge>{tournamentData?.rounds} rounds</Badge>
          </div>
          <p className='mb-6'>{tournamentData?.description}</p>

          <CoordinatorOnly>
            {tournamentData && (
              <TournamentParticipantsTableForm tournament={tournamentData} />
            )}
          </CoordinatorOnly>

          <PlayerOnly>
            {resultData && (
              <ParticipantResults tournamentResults={resultData} />
            )}
          </PlayerOnly>
        </article>
      </section>
    </AppLayout>
  );
};

export default TournamentDetailsPage;
