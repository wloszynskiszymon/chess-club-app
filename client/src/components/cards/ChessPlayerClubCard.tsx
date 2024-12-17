import { JoinClubProvider } from '../features/data-table/button/JoinClubContext';
import DataTable from '../features/data-table/DataTable';
import { Club, columns } from '../features/data-table/Columns';
import { Card } from '../ui/card';

const ChessPlayerClubCard = ({ data }: { data: Club[] }) => {
  return (
    <Card className='p-4 w-[50rem]'>
      <h1 className='text-2xl uppercase font-bold'>Before we start</h1>
      <p className='text-sm text-gray-600 mb-4'>
        Welcome to the ChessMate! As a coordinator, you must first create your
        chess club before you can start using the app. Your club name must be
        unique and can't be changed later.
      </p>
      <JoinClubProvider>
        <DataTable columns={columns} data={data} />
      </JoinClubProvider>
    </Card>
  );
};

export default ChessPlayerClubCard;
