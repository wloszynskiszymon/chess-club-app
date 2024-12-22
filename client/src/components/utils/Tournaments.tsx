import React from 'react';
import { cn } from '../../lib/utils';
import TournamentCard from '../cards/TournamentCard';
import { Tournament } from '../../types/server';

type TournamentsProps = React.HTMLProps<HTMLDivElement> & {
  tournaments: Tournament[] | [];
};
const Tournaments = ({
  className = '',
  tournaments,
  ...props
}: TournamentsProps) => {
  if (tournaments.length === 0) {
    return <p className='text-center'>No tournaments scheduled.</p>;
  }

  return (
    <div {...props} className={cn(`${className} grid grid-cols-3 gap-2`)}>
      {tournaments.map(tournament => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
};

export default Tournaments;
