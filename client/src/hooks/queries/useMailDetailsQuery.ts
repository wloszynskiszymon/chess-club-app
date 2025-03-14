import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Message } from '@/types/mail';
import { getMailDetails } from '@/api/mail';

const useMailDetailsQuery = (
  mailId: string,
  useQueryParams?: Partial<UseQueryOptions<Message>>
) => {
  return useQuery<Message>({
    queryKey: ['mail', 'details', mailId],
    queryFn: getMailDetails.bind(null, mailId),
    ...useQueryParams,
  });
};

export default useMailDetailsQuery;
