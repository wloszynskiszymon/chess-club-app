import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '../api/axios';
import { User } from '../types/zod';

const useUserQuery = (useQueryOptions?: UseQueryOptions<User, unknown>) => {
  return useQuery<User, unknown>({
    queryKey: ['user'],
    queryFn: async () => {
      const result = await api.get<User>('/api/user/me');
      return result.data;
    },
    ...useQueryOptions,
  });
};

export default useUserQuery;
