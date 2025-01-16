import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { ParticipantResult } from '../../types/server';
import useUserQuery from './useUserQuery';

const useUserResultsQuery = (tournamentId?: string) => {
  const { data } = useUserQuery();

  return useQuery<ParticipantResult>({
    queryKey: [`results-${tournamentId}-me`],
    queryFn: async () => {
      const res = await api.get(`/api/tournament/${tournamentId}/me/results`);
      return res.data;
    },
    enabled: !!tournamentId && data?.role === 'CHESS_PLAYER',
  });
};

export default useUserResultsQuery;
