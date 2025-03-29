import useTournamentsQuery from '@/hooks/queries/tournament/useTournamentsQuery';
import MildCard from '../../components/utils/MildCard';
import React from 'react';
import { cn } from '@/lib/utils';
import HeadingSecondary from '@/components/utils/HeadingSecondary';
import HeadingDescription from '@/components/utils/HeadingDescription';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MildCardSkeleton from '@/components/utils/MildCardSkeleton';

type TournamentDashboardProps = React.HTMLAttributes<HTMLDivElement>;

const TournamentDashboard = ({
  className = '',
  ...props
}: TournamentDashboardProps) => {
  const { data: tournamentData, isLoading } = useTournamentsQuery({ limit: 3 });

  return (
    <div {...props} className={cn(className)}>
      <HeadingSecondary className='mb-2'>Tournaments</HeadingSecondary>
      <HeadingDescription className='mb-4'>
        See some of the upcoming tournaments and their details.
      </HeadingDescription>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mb-4'>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <MildCardSkeleton key={`tournament-loading-${index}`} />
          ))
        ) : tournamentData?.length ? (
          tournamentData.map(tournament => (
            <MildCard
              key={tournament.id}
              title={tournament.title}
              description={tournament.description}
              footer={`${tournament.participants.length} participants`}
            />
          ))
        ) : (
          <div className='col-span-full text-center text-muted-foreground text-sm'>
            No tournaments available
          </div>
        )}
      </div>

      <Link to='/tournaments' className='self-center text-center  text-sm'>
        <Button variant='ghost' className='underline underline-offset-4'>
          See more tournaments
        </Button>
      </Link>
    </div>
  );
};

export default TournamentDashboard;
