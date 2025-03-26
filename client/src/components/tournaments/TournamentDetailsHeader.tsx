import { Tournament } from '@/types/server';
import Heading from '../utils/Heading';
import CoordinatorOnly from '../utils/CoordinatorOnly';
import TournamentSheet from './TournamentSheet';
import { Button } from '../ui/button';
import TournamentDeleteButton from './TournamentDeleteButton';
import { Trash } from 'lucide-react';
import { Badge } from '../ui/badge';
import moment from 'moment';

const TournamentDetailsHeader = ({
  tournament,
}: {
  tournament: Tournament;
}) => {
  const date = moment(tournament.datetime).format('DD.MM.YYYY');
  const time = moment(tournament.datetime).format('HH:mm');

  return (
    <header>
      <div className='flex justify-between flex-col-reverse md:flex-row md:items-center'>
        <Heading className='inline-flex mb-2'>{tournament?.title}</Heading>
        <CoordinatorOnly>
          <aside className='md:flex-center flex justify-end gap-2 mb-4 md:mb-0'>
            <TournamentSheet
              formType='EDIT'
              tournament={tournament as Tournament}
            >
              <Button variant='outline'>Edit details</Button>
            </TournamentSheet>
            <TournamentDeleteButton tournamentId={tournament.id as string}>
              <Trash />
            </TournamentDeleteButton>
          </aside>
        </CoordinatorOnly>
      </div>
      <div className='flex gap-2 w-full mb-4'>
        <Badge>{date}</Badge>
        <Badge>{time}</Badge>
        <Badge>{tournament.rounds} rounds</Badge>
      </div>
      <p className='mb-6 text-xs md:text-sm lg:text-md'>
        {tournament.description}
      </p>
    </header>
  );
};

export default TournamentDetailsHeader;
