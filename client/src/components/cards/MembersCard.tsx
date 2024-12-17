import { User } from '../../types/zod';
import { Card } from '../ui/card';

const MembersCard = ({ members }: { members: User[] }) => {
  return (
    <Card className='p-4 !justify-self-end !self-end'>
      <h1 className='font-bold text-lg uppercase'>Club members:</h1>
      {members.map(member => (
        <p key={member.id}>{member.firstName + ' ' + member.lastName}</p>
      ))}
    </Card>
  );
};

export default MembersCard;
