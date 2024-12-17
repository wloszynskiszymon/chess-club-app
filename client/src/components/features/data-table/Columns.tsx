'use client';

import { ColumnDef } from '@tanstack/react-table';
import JoinClubButton from './button/JoinClubButton';

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

export const columns: ColumnDef<Club>[] = [
  {
    accessorFn: (_, i) => i + 1,
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'club name',
  },
  {
    accessorFn: row => `${row.owner.firstName} ${row.owner.lastName}`,
    header: 'coordinator',
  },
  {
    accessorFn: row => row.members.length,
    header: 'members',
  },
  {
    header: 'join',
    cell: ({ row }) => <JoinClubButton row={row} />,
  },
];
