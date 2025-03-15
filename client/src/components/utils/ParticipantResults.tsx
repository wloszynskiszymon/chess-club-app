import useUserQuery from '@/hooks/queries/user/useUserQuery';
import { ParticipantResult } from '../../types/server';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const ParticipantResults = ({
  tournamentResults: { wins, losses, draws, rating },
}: {
  tournamentResults: ParticipantResult;
}) => {
  const { data: userData } = useUserQuery();

  return (
    <Table>
      <TableCaption>You can only see your results.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Loses</TableHead>
          <TableHead>Draws</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>
            <div className='w-30 h-4'>
              {userData?.firstName + ' ' + userData?.lastName}
            </div>
          </TableCell>
          <TableCell>
            <div className='w-10 h-4'>{wins}</div>
          </TableCell>
          <TableCell>
            <div className='w-10 h-4'>{losses}</div>
          </TableCell>
          <TableCell>
            <div className='w-10 h-4'>{draws}</div>
          </TableCell>
          <TableCell>
            <div className='w-10 h-4'>{rating}</div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ParticipantResults;
