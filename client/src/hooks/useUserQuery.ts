import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '../api/axios';

const useUserQuery = (useQueryOptions: UseQueryOptions | {} = {}) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const result = await api('/api/user/me');
      return result.data;
    },
    ...useQueryOptions,
  });
};

export default useUserQuery;
