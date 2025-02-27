import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { Message, MessageCounts } from '@/types/mail';
import useUserQuery from '@/hooks/queries/useUserQuery';
import { saveMail } from '@/api/mail';

const SaveButton = ({ mail }: { mail: Message }) => {
  const { data: userData } = useUserQuery();
  const currentUserEmail = userData?.email;
  const queryClient = useQueryClient();

  const updateMailStatus = (
    mail: Message,
    newSavedStatus: boolean
  ): Message => ({
    ...mail,
    recipients: mail.recipients.map(entry =>
      entry.recipient.email === currentUserEmail
        ? { ...entry, isSaved: newSavedStatus }
        : entry
    ),
  });

  const mutation = useMutation({
    mutationKey: ['mails', mail.id],
    mutationFn: () => saveMail(mail.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['mails'] });

      // Snapshot the current state of the caches.
      const previousReceived = queryClient.getQueryData<Message[]>([
        'mails',
        'received',
      ]);
      const previousSent = queryClient.getQueryData<Message[]>([
        'mails',
        'sent',
      ]);
      const previousSaved = queryClient.getQueryData<Message[]>([
        'mails',
        'saved',
      ]);
      const previousCount = queryClient.getQueryData<MessageCounts>([
        'mails',
        'counts',
      ]);

      const wasSaved = mail.recipients.some(
        r => r.recipient.email === currentUserEmail && r.isSaved
      );

      const optimisticSavedStatus = !wasSaved;

      // Update the 'received' and 'sent' caches
      ['received', 'sent'].forEach(cat => {
        queryClient.setQueryData<Message[]>(['mails', cat], (old = []) =>
          old.map(m =>
            m.id === mail.id ? updateMailStatus(m, optimisticSavedStatus) : m
          )
        );
      });

      // Update the 'saved' cache.
      queryClient.setQueryData<Message[]>(['mails', 'saved'], (old = []) => {
        if (optimisticSavedStatus) {
          const exists = old.find(m => m.id === mail.id);
          if (!exists) {
            // add the mail to the saved list
            return [...old, updateMailStatus(mail, optimisticSavedStatus)];
          }
          // update the mail status
          return old.map(m =>
            m.id === mail.id ? updateMailStatus(m, optimisticSavedStatus) : m
          );
        } else {
          // remove the mail from the saved list
          return old.filter(m => m.id !== mail.id);
        }
      });

      queryClient.setQueryData<MessageCounts>(['mails', 'counts'], old => {
        if (!old) return old;
        return {
          ...old,
          // update the saved count
          saved: optimisticSavedStatus ? old.saved + 1 : old.saved - 1,
        };
      });

      return {
        previousReceived,
        previousSent,
        previousSaved,
        previousCount,
        wasSaved,
        optimisticSavedStatus,
      };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          ['mails', 'received'],
          context.previousReceived
        );
        queryClient.setQueryData(['mails', 'sent'], context.previousSent);
        queryClient.setQueryData(['mails', 'saved'], context.previousSaved);
        queryClient.setQueryData(['mails', 'counts'], context.previousCount);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mails'] });
    },
  });

  const isSaved = mail.recipients.some(
    r => r.recipient.email === currentUserEmail && r.isSaved
  );

  return (
    <button
      className='mr-4'
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      <HeartIcon fill={isSaved ? 'indianred' : 'none'} className='h-6 w-6' />
    </button>
  );
};

export default SaveButton;
