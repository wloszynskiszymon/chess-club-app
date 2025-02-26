import { useSuspenseQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { MailFilters, Message } from '@/types/mail';

const useMessagesQuery = (filter: MailFilters) => {
  return useSuspenseQuery<Message[]>({
    queryKey: ['mails', filter.type],
    queryFn: async () => {
      const res = await api.get('/api/mail?filter=' + filter.type);
      return res.data;
    },
    notifyOnChangeProps: 'all',
  });
};

export default useMessagesQuery;
