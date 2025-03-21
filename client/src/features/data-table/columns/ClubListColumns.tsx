import { ColumnDef } from '@tanstack/react-table';
import JoinClubButton from '../button/JoinClubButton';
import { DataTableColumnHeader } from '../DataTableColumnHeader';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type SafeUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
};
export type Club = {
  id: string;
  name: string;
  owner: SafeUser;
  members: SafeUser[];
};

export const clubColumns: ColumnDef<Club>[] = [
  {
    accessorFn: row => row.id,
    accessorKey: 'id',
    header: ({ column }) => (
      <div className='overflow-hidden text-xs md:text-sm lg:text-md'>
        {column.id}
      </div>
    ),
    cell: ({ row }) => (
      <div className='text-ellipsis w-[3rem] overflow-hidden text-xs md:text-sm lg:text-md'>
        {row.original.id}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='club name' />
    ),
    cell: ({ row }) => (
      <div className='text-xs md:text-sm lg:text-md text-ellipsis overflow-hidden'>
        {row.original.name}
      </div>
    ),
  },
  {
    accessorFn: row => `${row.owner.firstName} ${row.owner.lastName}`,
    accessorKey: 'owner',
    header: ({ column }) => (
      <div className='hidden md:block  text-xs md:text-sm'>{column.id}</div>
    ),
    cell: ({ row }) => (
      <div className='hidden md:block '>
        {row.original.owner.firstName + ' ' + row.original.owner.lastName}
      </div>
    ),
  },
  {
    accessorFn: row => row.members.length,
    accessorKey: 'members',
    cell: ({ row }) => (
      <div className='text-xs md:text-sm lg:text-md text-ellipsis overflow-hidden'>
        {row.original.members.length}
      </div>
    ),
    header: ({ column }) => (
      <div className='overflow-hidden text-xs md:text-sm lg:text-md'>
        {column.id}
      </div>
    ),
  },
  {
    accessorKey: 'join',
    cell: ({ row }) => <JoinClubButton row={row} />,
    header: ({ column }) => (
      <div className='overflow-hidden text-xs md:text-sm lg:text-md'>
        {column.id}
      </div>
    ),
  },
];
