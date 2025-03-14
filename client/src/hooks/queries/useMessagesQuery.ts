import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { Message } from '@/types/mail';
import { NavCategory } from '@/features/mails/types/mail';

type GetMailParams = {
  filter?: NavCategory;
  query?: string;
  limit?: number;
  page?: number;
};

const useMessagesQuery = (
  params: GetMailParams,
  useQueryParams?: UseQueryOptions<Message[]>
) => {
  return useQuery<Message[]>({
    queryKey: ['mails', params],
    queryFn: async (): Promise<Message[]> => {
      const res = await api.get('/api/mail', {
        params: {
          filter: params.filter,
          query: params.query,
          limit: params.limit,
          page: params.page,
        },
      });
      return res.data;
    },
    notifyOnChangeProps: 'all',
    staleTime: 1000 * 60 * 5,
    ...useQueryParams,
  });
};

export default useMessagesQuery;
