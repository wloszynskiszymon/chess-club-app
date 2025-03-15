import { useQuery } from '@tanstack/react-query';
import { MailsCounts } from '@/types/mail';
import { getMailCounts } from '@/api/mail';

const useMailsCounts = () => {
  return useQuery<MailsCounts>({
    queryKey: ['mails', 'counts'],
    queryFn: getMailCounts,
    staleTime: 1000 * 60 * 5,
    notifyOnChangeProps: 'all',
    placeholderData: {
      unread: 0,
      total: 0,
      saved: 0,
      sent: 0,
    },
  });
};

export default useMailsCounts;
