import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/mail';
import { useNavigate } from 'react-router-dom';
import MailCard from '../../components/MailCard';
import { NavCategory } from '../../types/mail';
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
  );
};

export default MailsList;
