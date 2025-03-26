import { Club } from '@/features/data-table/columns/ClubListColumns';
import HeadingSecondary from '../utils/HeadingSecondary';

type ClubInfoProps = React.HTMLProps<HTMLDivElement> & {
  club: Club;
};
const ClubInfo = ({ className = '', club }: ClubInfoProps) => {
  return (
    <div className={`${className} `}>
      <HeadingSecondary className='font-bold text-lg uppercase'>
        Your club:
      </HeadingSecondary>
      <p className='mb-6'>{club.name}</p>

      <h3 className='font-bold text-lg'>Members:</h3>

      {club.members.map(member => (
        <p className='text-gray-700' key={member.id}>
          {member.firstName + ' ' + member.lastName}
        </p>
      ))}
    </div>
  );
};

export default ClubInfo;
