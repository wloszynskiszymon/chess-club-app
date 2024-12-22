import { Tournament } from '../../types/server';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import moment from 'moment';

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const { title, date, time, description, rounds } = tournament;

  return (
    <Card className='p-2'>
      <h3 className='text-gray-800 font-bold text-lg'>{title}</h3>
      <p className='inline-flex gap-4 text-sm mb-2 text-gray-700'>
        <span>{moment(date).format('DD.MM.YYYY')}</span>{' '}
        <span>{moment(time).format('HH:MM')}</span>
        <span>{rounds} rounds</span>
      </p>
      <p className='text-gray-500 text-xs line-clamp-3 text-pretty'>
        {description}
      </p>
      <Button className='w-full mt-4' variant='ghost'>
        More info
      </Button>
    </Card>
  );
};

export default TournamentCard;
