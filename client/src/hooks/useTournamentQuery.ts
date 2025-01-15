import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Tournament } from '../types/server';

const useTournamentQuery = (id: string) => {
  return useQuery<Tournament>({
    queryKey: [`tournament-${id}}`],
    queryFn: async () => {
      const res = await api.get(`/api/tournament/${id}`);
      return res.data;
    },
  });
};

export default useTournamentQuery;
