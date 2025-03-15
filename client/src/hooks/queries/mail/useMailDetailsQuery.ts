import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Mail } from '@/types/mail';
import { getMailDetails } from '@/api/mail';
import { isAxiosError } from 'axios';

const useMailDetailsQuery = (
  mailId: string,
  useQueryParams?: Partial<UseQueryOptions<Mail>>
) => {
  return useQuery<Mail>({
    queryKey: ['mail', 'details', mailId],
    queryFn: getMailDetails.bind(null, mailId),
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response?.status === 404) {
        return false; // Do not retry
      }
      return failureCount < 3;
    },

    ...useQueryParams,
  });
};

export default useMailDetailsQuery;
