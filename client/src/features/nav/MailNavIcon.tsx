import { MailIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getMails } from '@/api/mail';
import useMailsCounts from '@/hooks/queries/mail/useMailsCounts';

const MailNavIcon = ({ disabled }: { disabled?: boolean }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useMailsCounts();

  const handleClick = () => {
    !disabled && navigate('/mail/received');
  };

  const prefetchData = () => {
    const queryMailsKey = ['mails', 'recieved'];
    const queryMailsState = queryClient.getQueryState(queryMailsKey);
    if (!queryMailsState) {
      queryClient.prefetchQuery({
        queryKey: queryMailsKey,
        queryFn: () => getMails('received'),
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
      {!isLoading && data && data?.unread > 0 && (
        <div className='absolute -top-[4px] -right-[5px] size-3 rounded-full bg-orange-500 border border-white shadow-md'></div>
      )}
    </div>
  );
};

export default MailNavIcon;
