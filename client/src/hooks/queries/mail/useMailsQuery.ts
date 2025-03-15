import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import api from '../../../api/axios';
import { Mail } from '@/types/mail';
import { MailFilter } from '@/features/mails/types/mail';

type GetMailParams = {
  filter?: MailFilter;
  query?: string;
  limit?: number;
  page?: number;
};

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
