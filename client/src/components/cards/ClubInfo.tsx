import { Club } from '@/features/data-table/columns/ClubListColumns';
import HeadingSecondary from '../utils/HeadingSecondary';
import MildCard from './MildCard';
import HeadingDescription from '../utils/HeadingDescription';

type ClubInfoProps = React.HTMLProps<HTMLDivElement> & {
  club: Club;
};
const ClubInfo = ({ className = '', club }: ClubInfoProps) => {
  return (
    <article className={`${className}`}>
      <HeadingSecondary className='mb-1'>
        Members of your club:
      </HeadingSecondary>
      <HeadingDescription className='mb-4'>
        See the members of your club and their roles.
      </HeadingDescription>

      <div className='grid grid-cols-3 gap-4'>
        {club.members.map(member => (
          <MildCard
            key={member.id}
            title={member.firstName + ' ' + member.lastName}
            description={member.email}
            footer={member.role}
            className='mb-2'
          />
        ))}
      </div>
    </article>
  );
};

export default ClubInfo;
