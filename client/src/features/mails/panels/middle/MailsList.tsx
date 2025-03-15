import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail } from '@/types/mail';
import { useNavigate } from 'react-router-dom';
import MailCard from '../../components/MailCard';
import useUserQuery from '@/hooks/queries/user/useUserQuery';
import MailCardSkeleton from '../../components/skeleton/MailCardSkeleton';
import useMailUrl from '../../hooks/useMailUrl';

type MailsListProps = {
  mails: Mail[];
  activeMailId: string | undefined;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  loadingRef: (node?: Element | null) => void;
  callbackText?: string;
};

const MailsList = ({
  mails,
  activeMailId,
  isLoading,
  isFetchingNextPage,
  loadingRef,
  callbackText = 'Your inbox is empty',
}: MailsListProps) => {
  const { filter, isSearchingMail, searchParams } = useMailUrl();
  const navigate = useNavigate();

  const { data } = useUserQuery();

  const handleClick = (id: string) => {
    navigate(
      `/mail/${filter}/${id}${isSearchingMail ? '?' + searchParams : ''}`
    );
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
      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, index) => (
          <MailCardSkeleton key={`next-${index}`} />
        ))}
      <div ref={loadingRef} className='h-10' />
    </ScrollArea>
  );
};

export default MailsList;
