import { useSuspenseQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { MessageCounts } from '@/types/mail';

const useMessagesCountsQuery = () => {
  return useSuspenseQuery<MessageCounts>({
    queryKey: ['mails', 'counts'],
    queryFn: async () => {
      const res = await api.get('/api/mail/counts');
      return res.data;
    },
    notifyOnChangeProps: 'all',
  });
};

export default useMessagesCountsQuery;
