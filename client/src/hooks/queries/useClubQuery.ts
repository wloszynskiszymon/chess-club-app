import { useQuery } from '@tanstack/react-query';
import { Club } from '../../components/features/data-table/columns/ClubListColumns';
import api from '../../api/axios';

const useClubsQuery = () => {
  return useQuery<Club[]>({
    queryKey: ['clubs'],
    queryFn: async () => {
      const res = await api.get('/api/club');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useClubsQuery;
