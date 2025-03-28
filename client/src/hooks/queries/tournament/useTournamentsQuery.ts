import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '@/api/axios';
import { Tournament } from '@/types/server';

type TournamentParams = {
  query?: string;
  limit?: number;
  page?: number;
};

const useTournamentsQuery = (
  params: TournamentParams = {},
  useQueryParams?: UseQueryOptions<Tournament[]>
) => {
  return useQuery<Tournament[]>({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const res = await api.get('/api/tournament', {
        params: {
          query: params.query,
          limit: params.limit,
          page: params.page,
        },
      });
      return res.data;
    },
    refetchInterval: 10000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 10000,
    ...useQueryParams,
  });
};

export default useTournamentsQuery;
