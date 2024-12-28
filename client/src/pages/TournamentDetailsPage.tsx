import { useParams } from 'react-router-dom';
import AppLayout from '../components/utils/AppLayout';
import Heading from '../components/utils/Heading';
import LoadingScreen from '../components/utils/LoadingScreen';
import Nav from '../components/utils/Nav';
import useTournamentsQuery from '../hooks/useTournamentsQuery';
import { Badge } from '../components/ui/badge';
import moment from 'moment';
import { Button } from '../components/ui/button';
import { Trash } from 'lucide-react';
import TournamentSheet from '../components/utils/TournamentSheet';
import { Tournament } from '../types/server';
import TournamentDeleteButton from '../components/buttons/TournamentDeleteButton';
import TournamentParticipantsTableForm from '../components/forms/TournamentParticipantsTableForm';

const TournamentDetailsPage = () => {
  const { data: tournamentData, isFetching: isFetchingTournamentData } =
    useTournamentsQuery();
  const params = useParams();

  if (isFetchingTournamentData && !tournamentData) return <LoadingScreen />;

  const tournament = tournamentData?.find(
    tournament => tournament.id === params.tournamentId
  );

  const date = moment(tournament?.date).format('DD.MM.YYYY');
  const time = moment(tournament?.time).format('HH:MM');

  return (
    <AppLayout>
      <Nav />
      <section className='px-4 pt-24 flex gap-2'>
        <article className='w-full  mx-20'>
          <div className='flex justify-between items-center'>
            <Heading className='inline-flex mb-2'>{tournament?.title}</Heading>
            <aside className='flex-center gap-2'>
              <TournamentSheet
                formType='EDIT'
                tournament={tournament as Tournament}
              >
                <Button variant='outline'>Edit details</Button>
              </TournamentSheet>
              <TournamentDeleteButton tournamentId={tournament?.id as string}>
                <Trash />
              </TournamentDeleteButton>
            </aside>
          </div>
          <div className='flex gap-2 w-full mb-4'>
            <Badge>{date}</Badge>
            <Badge>{time}</Badge>
            <Badge>{tournament?.rounds} rounds</Badge>
          </div>
          <p className='mb-6'>{tournament?.description}</p>

          {tournament && (
            <TournamentParticipantsTableForm tournament={tournament} />
          )}
        </article>
      </section>
    </AppLayout>
  );
};

export default TournamentDetailsPage;
