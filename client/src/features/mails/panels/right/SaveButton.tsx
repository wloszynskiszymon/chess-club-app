import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { Message } from '@/types/mail';
import { saveMail } from '@/api/mail';

const SaveButton = ({ mail }: { mail: Message }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['mails', 'save', mail.id],
    mutationFn: () => saveMail(mail.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mails', 'counts'] });
      queryClient.invalidateQueries({ queryKey: ['mails', 'saved'] });
      queryClient.invalidateQueries({
        queryKey: ['mail', 'details', mail.id],
      });
    },
  });

  const isSaved = mail.recipients[0].isSaved;

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
