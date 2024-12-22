import { useNavigate } from 'react-router-dom';
import { Tournament } from '../../types/server';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import moment from 'moment';

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const navigate = useNavigate();
  const { title, date, time, description, rounds } = tournament;

  const handleClick = () => {
    navigate(`/tournament/${tournament.id}`);
  };

  return (
    <Card className='p-2 flex flex-col'>
      <div className='flex w-full justify-between items-center'>
        <h3 className='text-gray-800 font-bold text-lg inline-block'>
          {title}
        </h3>
        <Badge variant='secondary'>{moment(date).fromNow()}</Badge>
      </div>

      <p className='inline-flex gap-4 text-sm mb-2 text-gray-700'>
        <span>{moment(date).format('DD.MM.YYYY')}</span>{' '}
        <span>{moment(time).format('HH:MM')}</span>
        <span>{rounds} rounds</span>
      </p>
      <p className='text-gray-500 flex-1 text-xs line-clamp-3 text-pretty'>
        {description}
      </p>
      <Button onClick={handleClick} className='w-full mt-4' variant='ghost'>
        More info
      </Button>
    </Card>
  );
};

export default TournamentCard;
