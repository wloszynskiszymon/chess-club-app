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
          <TableHead className='w-[50px] md:w-[100px]'>#</TableHead>
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
          <TableCell className='w-30 line-clamp-1 text-ellipsis text-xs md:text-sm lg:text-md'>
            {userData?.firstName + ' ' + userData?.lastName}
          </TableCell>
          <TableCell className='w-10 h-4'>{wins}</TableCell>
          <TableCell className='w-10 h-4'>{losses}</TableCell>
          <TableCell className='w-10 h-4'>{draws}</TableCell>
          <TableCell className='w-10 h-4'>{rating}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ParticipantResults;
