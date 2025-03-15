import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import api from '../../../api/axios';
import { GetMailParams, Mail } from '@/types/mail';

const useMailsQuery = (
  params: GetMailParams,
  useQueryParams?: UseQueryOptions<Mail[]>
) => {
  return useQuery<Mail[]>({
    queryKey: ['mails', params.filter],
    queryFn: async (): Promise<Mail[]> => {
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

export default useMailsQuery;
