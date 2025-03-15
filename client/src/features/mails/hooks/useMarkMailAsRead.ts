import { setMailAsRead } from '@/api/mail';
import { Mail } from '@/types/mail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import useMailUrl from './useMailUrl';

// This hook is used to mark a mail as read when the user navigates to the mail details page.
const useMarkMailAsRead = (mail?: Mail) => {
  const { filter } = useMailUrl();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['mails', 'read', mail?.id],
    mutationFn: () => (mail ? setMailAsRead(mail.id) : Promise.reject()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mails', 'counts'] });
      queryClient.invalidateQueries({ queryKey: ['mails', 'received'] });
    },
  });

  useEffect(() => {
    if (!mail) return;
    if (mail.recipients?.[0]?.isRead) return;

    if (filter === 'received' && !mutation.isPending) {
      console.log('Marking mail as read...');
      mutation.mutate();
    }
  }, [mail, filter]);

  return mutation;
};

export default useMarkMailAsRead;
