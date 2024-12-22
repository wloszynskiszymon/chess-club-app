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
import ParticipantsTable from '../components/utils/ParticipantsTable';

const TournamentDetailsPage = () => {
  const { data: tournamentData, isFetching: isFetchingTournamentData } =
    useTournamentsQuery();
  const params = useParams();

  if (isFetchingTournamentData && !tournamentData) return <LoadingScreen />;

  const tournament = tournamentData?.find(
    tournament => tournament.id === params.tournamentId
  );

  console.log(tournament);

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
              <Button className='self-end' disabled>
                Save
              </Button>
              <Button variant='outline'>Edit details</Button>
              <Button variant='destructive'>
                <Trash />
              </Button>
            </aside>
          </div>
          <div className='flex gap-2 w-full mb-4'>
            <Badge>{date}</Badge>
            <Badge>{time}</Badge>
            <Badge>{tournament?.rounds} rounds</Badge>
          </div>
          <p>{tournament?.description}</p>

          {tournament && (
            <div className='flex flex-col gap-2'>
              <ParticipantsTable participants={tournament.participants} />
            </div>
          )}
        </article>
      </section>
    </AppLayout>
  );
};

export default TournamentDetailsPage;
