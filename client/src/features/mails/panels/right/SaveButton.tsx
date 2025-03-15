import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { Mail } from '@/types/mail';
import { saveMail } from '@/api/mail';

const SaveButton = ({ mail }: { mail: Mail }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['mail', 'save', mail.id],
    mutationFn: () => saveMail(mail.id),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['mail', 'details', mail.id],
      });
      await queryClient.cancelQueries({ queryKey: ['mails', 'counts'] });
      await queryClient.cancelQueries({ queryKey: ['mails', 'saved'] });
      const previousCounts = queryClient.getQueryData(['mails', 'counts']);
      const previousMail = queryClient.getQueryData([
        'mail',
        'details',
        mail.id,
      ]) as Mail;
      const savedMails = queryClient.getQueryData(['mails', 'saved']);

      if (savedMails) {
        queryClient.setQueryData(
          ['mails', 'saved'],
          (oldSaved: Mail[] = []) => {
            if (mail.recipients[0].isSaved) {
              const updatedSavedMails = oldSaved.filter(
                savedMail => savedMail.id !== mail.id
              );
              console.log(updatedSavedMails);
              return updatedSavedMails;
            } else {
              return [...oldSaved, mail];
            }
          }
        );
      }

      // Optimistically toggle isSaved
      queryClient.setQueryData(
        ['mail', 'details', mail.id],
        (oldMail: Mail | undefined) => {
          if (!oldMail) return oldMail;
          return {
            ...oldMail,
            recipients: oldMail.recipients.map(r =>
              r.id === mail.recipients[0].id ? { ...r, isSaved: !r.isSaved } : r
            ),
          };
        }
      );

      // Optimistically update count
      queryClient.setQueryData(['mails', 'counts'], (oldCounts: any) => {
        if (!oldCounts) return oldCounts;
        return {
          ...oldCounts,
          saved: mail.recipients[0].isSaved
            ? oldCounts.saved - 1
            : oldCounts.saved + 1,
        };
      });

      return { previousMail, previousCounts, savedMails };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousMail) {
        queryClient.setQueryData(
          ['mail', 'details', mail.id],
          context.previousMail
        );
      }
      if (context?.previousCounts) {
        queryClient.setQueryData(['mails', 'counts'], context.previousCounts);
      }
      if (context?.savedMails) {
        queryClient.setQueryData(['mails', 'saved'], context.savedMails);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'mails',
      });
    },
  });

  const isSaved = mail.recipients[0].isSaved;

  return (
    <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      <HeartIcon fill={isSaved ? 'indianred' : 'none'} className='h-6 w-6' />
    </button>
  );
};

export default SaveButton;
