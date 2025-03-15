import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import { Tournament } from '@/types/server';

const useTournamentsQuery = () => {
  return useQuery<Tournament[]>({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const res = await api.get('/api/tournament');
      return res.data;
    },
    refetchInterval: 10000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 10000,
  });
};

export default useTournamentsQuery;
