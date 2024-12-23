import { Participant } from '../../types/server';
import { Badge } from '../ui/badge';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import NumberSelect from './NumberSelect';

type ParticipantsTableProps = {
  participants: {
    user: Participant;
  }[];
};

const ParticipantsTable = ({ participants }: ParticipantsTableProps) => {
  return (
    <Table>
      <TableCaption>List of tournament participants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Loses</TableHead>
          <TableHead>Draws</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className='text-right'>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map(({ user }, i) => (
          <TableRow>
            <TableCell className='font-medium'>{i + 1}</TableCell>
            <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
            <TableCell>
              <NumberSelect amount={7} />
            </TableCell>
            <TableCell>
              <NumberSelect amount={7} />
            </TableCell>
            <TableCell>
              <NumberSelect amount={7} />
            </TableCell>
            <TableCell>
              <NumberSelect amount={10} />
            </TableCell>
            <TableCell className='text-right'>
              <Badge variant='outline'>Participates</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParticipantsTable;
