import HeadingDescription from '@/components/utils/HeadingDescription';
import HeadingSecondary from '@/components/utils/HeadingSecondary';
import MildCard from '@/components/utils/MildCard';
import { Club } from '@/features/data-table/columns/ClubListColumns';

type ClubMembersDashboardProps = React.HTMLProps<HTMLDivElement> & {
  club: Club;
};
const ClubMembersDashboard = ({
  className = '',
  club,
}: ClubMembersDashboardProps) => {
  return (
    <article className={`${className}`}>
      <HeadingSecondary className='mb-1'>
        Members of your club:
      </HeadingSecondary>
      <HeadingDescription className='mb-4'>
        See the members of your club and their roles.
      </HeadingDescription>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4'>
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

export default ClubMembersDashboard;
