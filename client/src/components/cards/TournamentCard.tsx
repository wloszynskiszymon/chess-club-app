import { useNavigate } from 'react-router-dom';
import { Tournament } from '../../types/server';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import moment from 'moment';

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const navigate = useNavigate();
  const { title, datetime, description, rounds } = tournament;

  const handleClick = () => {
    navigate(`/tournament/${tournament.id}`);
  };

  return (
    <Card className='p-2 flex flex-col'>
      <div className='flex w-full justify-between items-center'>
        <h3 className='text-gray-800 font-bold text-md lg:text-lg inline-block text-ellipsis line-clamp-1 whitespace-nowrap'>
          {title}
        </h3>
        <Badge
          className='text-xs md:text-sm text-ellipsis line-clamp-1 whitespace-nowrap overflow-hidden flex-shrink-0'
          variant='secondary'
        >
          {moment(datetime).fromNow()}
        </Badge>
      </div>

      <p className='inline-flex gap-1 md:gap-2 lg:gap-4 text-xs justify-between mt-1 md:text-sm mb-2 text-gray-700'>
        <span>{moment(datetime).format('DD.MM.YYYY')}</span>{' '}
        <span>{moment(datetime).format('HH:mm')}</span>
        <span>{rounds} rounds</span>
      </p>
      <p className='text-gray-500 flex-1 text-xs line-clamp-3 text-pretty'>
        {description}
      </p>
      <Button
        onClick={handleClick}
        className='text-xs md:text-sm lg:text-md w-full mt-2 md:mt-4'
        variant='ghost'
      >
        More info
      </Button>
    </Card>
  );
};

export default TournamentCard;
