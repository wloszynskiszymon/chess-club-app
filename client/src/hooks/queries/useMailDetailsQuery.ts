import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Mail } from '@/types/mail';
import { getMailDetails } from '@/api/mail';

const useMailDetailsQuery = (
  mailId: string,
  useQueryParams?: Partial<UseQueryOptions<Mail>>
) => {
  return useQuery<Mail>({
    queryKey: ['mail', 'details', mailId],
    queryFn: getMailDetails.bind(null, mailId),
    ...useQueryParams,
  });
};

export default useMailDetailsQuery;
