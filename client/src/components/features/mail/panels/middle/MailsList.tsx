import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/mail';
import { useNavigate } from 'react-router-dom';
import MailCard from '../../components/MailCard';
import MailSectionHeader from '../../components/MailSectionHeader';
import MailSectionHeading from '../../components/MailSectionHeading';
import { Separator } from '@radix-ui/react-select';
import SearchMailInput from '../../components/SearchMailInput';
import { NavCategory } from '../../types/mail';

type MailsListProps = {
  mails: Message[];
  category: NavCategory;
  activeMailId: string | undefined;
};

const MailsList = ({ mails, category, activeMailId }: MailsListProps) => {
  const navigate = useNavigate();

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
        <SearchMailInput type={category} />
      </div>
      <ScrollArea className='h-full pl-2 pr-4 pb-32'>
        {mails.map(mail => (
          <MailCard
            key={mail.id}
            activeMailId={activeMailId}
            mail={mail}
            handleClick={handleClick}
          />
        ))}
      </ScrollArea>
    </section>
  );
};

export default MailsList;
