import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

const useResultsQuery = (tournamentId?: string) => {
  return useQuery({
    queryKey: [`results-${tournamentId}`],
    queryFn: async () => {
      const res = await api.get(`/api/tournament/${tournamentId}/results`);
      return res.data;
    },
    enabled: !!tournamentId,
  });
};

export default useResultsQuery;
