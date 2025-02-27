import { Club } from '@/features/data-table/columns/ClubListColumns';
import { Card } from '../ui/card';

const MembersCard = ({ club }: { club: Club }) => {
  return (
    <Card className='p-4 !justify-self-end !self-end'>
      <h1 className='font-bold text-lg uppercase'>Club:</h1>
      <p className='mb-6'>{club.name}</p>
      <h2 className='font-bold text-md uppercase'>Club members:</h2>
      {club.members.map(member => (
        <p key={member.id}>{member.firstName + ' ' + member.lastName}</p>
      ))}
    </Card>
  );
};

export default MembersCard;
