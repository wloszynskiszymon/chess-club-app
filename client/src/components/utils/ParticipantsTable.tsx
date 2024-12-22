import { Participant } from '../../types/server';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

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
              <Select>
                <SelectTrigger className='w-20'>
                  <SelectValue placeholder='0' />
                </SelectTrigger>
                <SelectContent className='w-20'>
                  <SelectItem value='light'>1</SelectItem>
                  <SelectItem value='dark'>2</SelectItem>
                  <SelectItem value='system'>3</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className='w-20'>
                  <SelectValue placeholder='0' />
                </SelectTrigger>
                <SelectContent className='w-20'>
                  <SelectItem value='light'>1</SelectItem>
                  <SelectItem value='dark'>2</SelectItem>
                  <SelectItem value='system'>3</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className='w-20'>
                  <SelectValue placeholder='0' />
                </SelectTrigger>
                <SelectContent className='w-20'>
                  <SelectItem value='light'>1</SelectItem>
                  <SelectItem value='dark'>2</SelectItem>
                  <SelectItem value='system'>3</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className='w-20'>
                  <SelectValue placeholder='0' />
                </SelectTrigger>
                <SelectContent className='w-20'>
                  <SelectItem value='light'>1</SelectItem>
                  <SelectItem value='dark'>2</SelectItem>
                  <SelectItem value='system'>3</SelectItem>
                </SelectContent>
              </Select>
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
