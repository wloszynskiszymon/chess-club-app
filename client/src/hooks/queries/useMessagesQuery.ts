import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { MailFilters, Message } from '@/types/mail';

const useMessagesQuery = (
  filter: MailFilters,
  useQueryParams?: UseQueryOptions<Message[]>
) => {
  return useQuery<Message[]>({
    queryKey: ['mails', filter.type],
    queryFn: async (): Promise<Message[]> => {
      const res = await api.get('/api/mail?filter=' + filter.type);
      return res.data;
    },
    notifyOnChangeProps: 'all',
    ...useQueryParams,
  });
};

export default useMessagesQuery;
