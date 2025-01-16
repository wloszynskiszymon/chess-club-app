import { Tournament } from '../../types/server';
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
  tournament: Tournament;
};

const ParticipantsTable = ({ tournament }: ParticipantsTableProps) => {
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
        {tournament.participants.map(({ id, firstName, lastName }, i) => (
          <TableRow key={id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{firstName + ' ' + lastName}</TableCell>
            <TableCell>
              <NumberSelect name={`${id}.wins`} amount={tournament.rounds} />
            </TableCell>
            <TableCell>
              <NumberSelect name={`${id}.losses`} amount={tournament.rounds} />
            </TableCell>
            <TableCell>
              <NumberSelect name={`${id}.draws`} amount={tournament.rounds} />
            </TableCell>
            <TableCell>
              <NumberSelect name={`${id}.rating`} amount={10} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParticipantsTable;
