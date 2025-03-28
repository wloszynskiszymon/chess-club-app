import useTournamentsQuery from '@/hooks/queries/tournament/useTournamentsQuery';
import MildCard from '../cards/MildCard';

const TournamentDashboard = () => {
  const { data: tournamentData, isLoading } = useTournamentsQuery();

  if (isLoading)
    return <div className='text-center text-muted-foreground'>Loading...</div>;

  if (tournamentData?.length === 0)
    return <div className='text-center text-muted-foreground'>No conntent</div>;

  return (
    <div className='grid grid-cols-3 gap-4'>
      {tournamentData?.slice(0, 3).map(tournament => {
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
  );
};

export default TournamentDashboard;
