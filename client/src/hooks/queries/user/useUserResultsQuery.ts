import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import useUserQuery from './useUserQuery';
import { ParticipantResult } from '@/types/server';

const useUserResultsQuery = (tournamentId?: string) => {
  const { data } = useUserQuery();

  return useQuery<ParticipantResult>({
    queryKey: [`results-${tournamentId}-me`],
    queryFn: async () => {
      // Ignore for coordinators
      if (data?.role === 'COORDINATOR') {
        return {};
      }
      const res = await api.get(`/api/tournament/${tournamentId}/me/results`);
      return res.data;
    },
    retry: 2,
    retryDelay: 10,
    enabled: !!tournamentId,
  });
};

export default useUserResultsQuery;
