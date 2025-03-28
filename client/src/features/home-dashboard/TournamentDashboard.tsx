import useTournamentsQuery from '@/hooks/queries/tournament/useTournamentsQuery';
import MildCard from '../../components/utils/MildCard';
import React from 'react';
import { cn } from '@/lib/utils';
import HeadingSecondary from '@/components/utils/HeadingSecondary';
import HeadingDescription from '@/components/utils/HeadingDescription';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type TournamentDashboardProps = React.HTMLAttributes<HTMLDivElement>;
const TournamentDashboard = ({
  className = '',
  ...props
}: TournamentDashboardProps) => {
  const { data: tournamentData, isLoading } = useTournamentsQuery({
    limit: 3,
  });

  if (isLoading)
    return <div className='text-center text-muted-foreground'>Loading...</div>;

  if (tournamentData?.length === 0)
    return <div className='text-center text-muted-foreground'>No conntent</div>;

  return (
    <div {...props} className={cn(className)}>
      <HeadingSecondary className='mb-2'>Tournaments</HeadingSecondary>
      <HeadingDescription className='mb-4'>
        See some of the upcoming tournaments and their details.
      </HeadingDescription>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4'>
        {tournamentData?.map(tournament => {
          return (
            <MildCard
              key={tournament.id}
              title={tournament.title}
              description={tournament.description}
              footer={tournament.participants.length + ' participants'}
            />
          );
        })}
      </div>

      <Button className='mt-4 self-center' variant='ghost'>
        <Link
          className='text-center underline underline-offset-2 text-sm'
          to='/tournaments'
        >
          See more tournaments
        </Link>
      </Button>
    </div>
  );
};

export default TournamentDashboard;
