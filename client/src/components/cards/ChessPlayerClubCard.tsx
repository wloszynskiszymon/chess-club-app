import { JoinClubProvider } from '../../features/data-table/columns/JoinClubContext';
import DataTable from '../../features/data-table/DataTable';
import { clubColumns } from '@/features/data-table/columns/ClubListColumns';
import { Card } from '../ui/card';
import useClubsQuery from '../../hooks/queries/useClubQuery';

const ChessPlayerClubCard = () => {
  const { data: clubsData, isLoading: isLoadingClubsData } = useClubsQuery();

  if (isLoadingClubsData || !clubsData) return null;

  return (
    <Card className='p-4 w-full max-w-[50rem]'>
      <h1 className='text-2xl uppercase font-bold mb-2'>Before we start</h1>
      <p className='text-sm text-gray-500 mb-4'>
        Welcome to the ChessMate! As a coordinator, you must first create your
        chess club before you can start using the app. Your club name must be
        unique and can't be changed later.
      </p>
      <JoinClubProvider>
        <DataTable columns={clubColumns} data={clubsData} />
      </JoinClubProvider>
    </Card>
  );
};

export default ChessPlayerClubCard;
