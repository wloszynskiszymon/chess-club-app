import { Participant } from '../../types/server';
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
  participants: { user: Participant }[];
  rounds: number;
};

const ParticipantsTable = ({
  participants,
  rounds,
}: ParticipantsTableProps) => {
  return (
    <Table>
      <TableCaption>List of tournament participants.</TableCaption>
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
        {participants.map(({ user }, i) => (
          <TableRow key={user.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
            <TableCell>
              <NumberSelect name={`${user.id}.wins`} amount={rounds} />
            </TableCell>
            <TableCell>
              <NumberSelect name={`${user.id}.losses`} amount={rounds} />
            </TableCell>
            <TableCell>
              <NumberSelect name={`${user.id}.draws`} amount={rounds} />
            </TableCell>
            <TableCell>
              <NumberSelect name={`${user.id}.rating`} amount={10} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParticipantsTable;
