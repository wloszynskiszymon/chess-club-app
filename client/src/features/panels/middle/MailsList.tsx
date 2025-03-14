import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/mail';
import { useNavigate } from 'react-router-dom';
import MailCard from '../../mails/components/MailCard';
import MailSectionHeader from '../../mails/components/MailSectionHeader';
import MailSectionHeading from '../../mails/components/MailSectionHeading';
import { Separator } from '@radix-ui/react-select';
import SearchInput from '../../mails/components/SearchMailInput';
import { NavCategory } from '../../mails/types/mail';
import useUserQuery from '@/hooks/queries/useUserQuery';

type MailsListProps = {
  mails: Message[];
  category: NavCategory;
  activeMailId: string | undefined;
};

const MailsList = ({ mails, category, activeMailId }: MailsListProps) => {
  const navigate = useNavigate();
  const { data } = useUserQuery();

  const handleClick = (id: string) => {
    navigate(`/mail/${category}/${id}`);
  };

  return (
    <section className='h-full'>
      <MailSectionHeader>
        <MailSectionHeading>Your inbox</MailSectionHeading>
      </MailSectionHeader>

      <Separator />

      <div className='px-2 my-4'>
        <SearchInput mailType={category} />
      </div>
      <ScrollArea className='h-full pl-2 pr-4 pb-32'>
        {data &&
          mails.map(mail => (
            <MailCard
              key={mail.id}
              activeMailId={activeMailId}
              mail={mail}
              handleClick={handleClick}
              userEmail={data?.email}
            />
          ))}
      </ScrollArea>
    </section>
  );
};

export default MailsList;
