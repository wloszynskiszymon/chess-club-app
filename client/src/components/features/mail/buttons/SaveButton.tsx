import api from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { Message } from '@/types/mail';
import useUserQuery from '@/hooks/queries/useUserQuery';

const saveMail = async (mailId: string) => {
  const res = await api.post(`/api/mail/${mailId}/save`, { mailId });
  return res.data;
};

const SaveButton = ({ mail }: { mail: Message }) => {
  const { data: userData } = useUserQuery();
  const currentUserEmail = userData?.email;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['mail', mail.id],
    mutationFn: () => saveMail(mail.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['mails'] });

      const previousMails = queryClient.getQueryData<Message[]>(['mails']);

      queryClient.setQueryData<Message[]>(['mails'], (old = []) =>
        old.map(m => {
          if (m.id === mail.id) {
            return {
              ...m,
              recipients: m.recipients.map(entry =>
                entry.recipient.email === currentUserEmail
                  ? { ...entry, isSaved: !entry.isSaved }
                  : entry
              ),
            };
          }
          return m;
        })
      );

      return { previousMails };
    },
    onError: (_, __, context) => {
      if (context?.previousMails) {
        queryClient.setQueryData(['mails'], context.previousMails);
      }
    },
    onSuccess: ({ recipient }) => {
      queryClient.setQueryData<Message[]>(['mails'], (old = []) =>
        old.map(m => {
          if (m.id === mail.id) {
            return {
              ...m,
              recipients: m.recipients.map(entry =>
                entry.recipient.email === currentUserEmail
                  ? { ...entry, isSaved: recipient.isSaved }
                  : entry
              ),
            };
          }
          return m;
        })
      );
    },
  });

  const handleSave = () => {
    mutation.mutate();
  };

  const isSaved = mail.recipients.some(
    r => r.recipient.email === currentUserEmail && r.isSaved
  );

  return (
    <button className='mr-4' onClick={handleSave} disabled={mutation.isPending}>
      <HeartIcon fill={isSaved ? 'indianred' : 'none'} className='h-6 w-6' />
    </button>
  );
};

export default SaveButton;
