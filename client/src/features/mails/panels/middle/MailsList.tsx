import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail } from '@/types/mail';
import { useNavigate } from 'react-router-dom';
import MailCard from '../../components/MailCard';
import { NavCategory } from '../../types/mail';
import useUserQuery from '@/hooks/queries/useUserQuery';
import MailCardSkeleton from '../../components/skeleton/MailCardSkeleton';

type MailsListProps = {
  mails: Mail[];
  category: NavCategory;
  activeMailId: string | undefined;
  isLoading: boolean;
  callbackText?: string;
};

const MailsList = ({
  mails,
  category,
  activeMailId,
  isLoading,
  callbackText = 'Your inbox is empty',
}: MailsListProps) => {
  const navigate = useNavigate();
  const { data } = useUserQuery();

  const handleClick = (id: string) => {
    navigate(`/mail/${category}/${id}`);
  };

  return (
    <ScrollArea className='h-full pl-2 pr-4 pb-32'>
      {!isLoading && mails && mails.length === 0 && (
        <div className='text-center text-gray-500 text-sm'>{callbackText}</div>
      )}
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <MailCardSkeleton key={index} />
          ))
        : data &&
          mails &&
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
