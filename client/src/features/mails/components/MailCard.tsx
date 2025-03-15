import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Mail } from '@/types/mail';
import moment from 'moment';
import useMailUrl from '../hooks/useMailUrl';
import { useQueryClient } from '@tanstack/react-query';
import { getMailDetails } from '@/api/mail';
import MailCardSkeleton from './skeleton/MailCardSkeleton';

const MailCard = ({
  activeMailId,
  mail,
  handleClick,
  userEmail,
}: {
  activeMailId: string | undefined;
  mail: Mail;
  userEmail: string;
  handleClick: (id: string) => void;
}) => {
  const { filter } = useMailUrl();
  const queryClient = useQueryClient();
  const isRead = mail?.recipients?.some(
    r => r.recipient.email === userEmail && r.isRead
  );

  const handlePrefetch = async (id: string) => {
    const cacheKey = ['mail', 'details', id];

    const existingData = queryClient.getQueryData(cacheKey);
    const queryState = queryClient.getQueryState(cacheKey);

    if (!existingData && queryState?.fetchStatus !== 'fetching') {
      console.log('Prefetching mail with id:', id);
      await queryClient.prefetchQuery({
        queryKey: cacheKey,
        queryFn: getMailDetails.bind(null, id),
      });
    }
  };

  if (!mail) return <MailCardSkeleton />;

  return (
    <Card
      key={mail.id}
      onMouseOver={handlePrefetch.bind(null, mail.id)}
      onClick={handleClick.bind(null, mail.id)}
      className={`px-4 py-2 h-36 hover:bg-muted mb-2 cursor-pointer ${
        activeMailId === mail.id ? 'bg-muted' : 'bg-gray-50'
      }`}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold line-clamp-1'>{mail.subject}</h2>
        <div className='flex-center'>
          {!isRead && filter === 'received' && (
            <Badge variant='secondary'>New</Badge>
          )}
          <p className='text-muted-foreground text-nowrap pl-4 text-sm'>
            {moment(mail.createdAt).format('DD-MM-YYYY')}
          </p>
        </div>
      </div>

      <p className='text-muted-foreground line-clamp-1 text-sm mb-2'>
        From: <span className='text-black text-md'>{mail.sender.email}</span>
      </p>
      <p className='text-muted-foreground line-clamp-3 text-sm mb-2'>
        {mail.body}
      </p>
    </Card>
  );
};

export default MailCard;
