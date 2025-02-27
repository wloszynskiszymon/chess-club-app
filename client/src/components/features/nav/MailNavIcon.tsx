import { MailIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getMailCounts, getMails } from '@/api/mail';

const MailNavIcon = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick = () => {
    navigate('/mail/received');
  };

  const prefetchData = () => {
    const queryMailsKey = ['mails', 'recieved'];
    const queryCountKey = ['mails', 'counts'];
    const queryMailsState = queryClient.getQueryState(queryMailsKey);
    const queryCountState = queryClient.getQueryState(queryCountKey);
    if (!queryMailsState) {
      queryClient.prefetchQuery({
        queryKey: queryMailsKey,
        queryFn: () => getMails('received'),
      });
    }

    if (!queryCountState) {
      queryClient.prefetchQuery({
        queryKey: queryCountKey,
        queryFn: getMailCounts,
      });
    }
  };

  return (
    <div
      className='relative cursor-pointer flex-center'
      onMouseOver={prefetchData}
      onClick={handleClick}
    >
      <MailIcon width={25} height={25} />
      {/* TODO: Only visible when there's a message */}
      <div className='absolute -top-[4px] -right-[5px] size-3 rounded-full bg-orange-500 border border-white shadow-md'></div>
    </div>
  );
};

export default MailNavIcon;
