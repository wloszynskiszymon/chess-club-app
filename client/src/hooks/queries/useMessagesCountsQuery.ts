import { useQuery } from '@tanstack/react-query';
import { MessageCounts } from '@/types/mail';
import { getMailCounts } from '@/api/mail';

const useMessagesCountsQuery = () => {
  return useQuery<MessageCounts>({
    queryKey: ['mails', 'counts'],
    queryFn: getMailCounts,
    staleTime: 1000 * 60 * 5,
    notifyOnChangeProps: 'all',
  });
};

export default useMessagesCountsQuery;
