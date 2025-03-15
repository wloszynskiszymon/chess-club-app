import { GetMailParams } from '@/types/mail';
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../../api/axios';
import { Mail } from '@/types/mail';

const useInfiniteMailsQuery = (params: GetMailParams) => {
  return useInfiniteQuery<Mail[], Error>({
    queryKey: ['mails', params.filter, params.query],
    queryFn: async ({ pageParam = 1 }): Promise<Mail[]> => {
      const res = await api.get('/api/mail', {
        params: {
          filter: params.filter,
          query: params.query,
          limit: params.limit ?? 10,
          page: pageParam,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useInfiniteMailsQuery;
