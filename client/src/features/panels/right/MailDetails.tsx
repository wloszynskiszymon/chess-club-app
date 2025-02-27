import { Separator } from '@/components/ui/separator';
import MailSectionHeading from '../../mails/components/MailSectionHeading';
import MailSectionHeader from '../../mails/components/MailSectionHeader';
import moment from 'moment';
import SaveButton from '../../mails/components/SaveButton';
import useMailUrl from '@/features/mails/hooks/useMailUrl';
import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import { NavCategory } from '../../mails/types/mail';
import { useEffect } from 'react';
import useUserQuery from '@/hooks/queries/useUserQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setMailAsRead } from '@/api/mail';
import { Message } from '@/types/mail';

const MailDetails = () => {
  const { category, mailId } = useMailUrl();

  const { data, isLoading } = useMessagesQuery({
    type: category as NavCategory,
  });
  const { data: userData } = useUserQuery();
  const queryClient = useQueryClient();

  const mail = data?.find(mail => mail.id === mailId);

  const mutation = useMutation({
    mutationKey: ['mails', 'read', mailId],
    mutationFn: () => setMailAsRead(mailId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['mails', 'received'] });
      await queryClient.cancelQueries({ queryKey: ['mails', 'counts'] });

      // Snapshot the current state of the caches.
      const previousReceived = queryClient.getQueryData(['mails', 'received']);
      const previousCounts = queryClient.getQueryData(['mails', 'counts']);

      // Update the 'received' cache
      queryClient.setQueryData(['mails', 'received'], (old: Message[] = []) =>
        old.map(m => (m.id === mailId ? { ...m, isRead: true } : m))
      );

      // Update the counts cache
      queryClient.setQueryData(['mails', 'counts'], (old: any) => ({
        ...old,
        unread: old.unread - 1,
      }));

      return { previousReceived, previousCounts };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ['mails', 'received'],
        context?.previousReceived
      );
      queryClient.setQueryData(['mails', 'counts'], context?.previousCounts);
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ['mails', 'received'],
      });
      queryClient.invalidateQueries({ queryKey: ['mails', 'counts'] });
    },
  });

  useEffect(() => {
    if (mail && userData && category === 'received') {
      const isRead = mail.recipients.some(
        r => r.recipient.email === userData.email && r.isRead
      );

      if (!isRead && !mutation.isPending) {
        console.log('Marking mail as read...');
        mutation.mutate();
      }
    }
  }, [mail, userData]);

  if (isLoading) {
    return (
      <section>
        <article className='flex-1 p-4'>
          <p className='text-sm text-muted-foreground text-center'>
            Loading...
          </p>
        </article>
      </section>
    );
  }

  if (!mail) {
    return (
      <section>
        <article className='flex-1 p-4'>
          <p className='text-sm text-muted-foreground text-center'>
            No content.
          </p>
        </article>
      </section>
    );
  }

  return (
    <section>
      <MailSectionHeader className='flex justify-between items-center'>
        <MailSectionHeading>Content of your mail</MailSectionHeading>

        <div className='flex justify-between items-center'>
          {category !== 'sent' && <SaveButton mail={mail} />}
        </div>
      </MailSectionHeader>

      <Separator />

      <article className='flex-1 p-4'>
        <div className='w-full'>
          <div className='flex w-full justify-between items-center'>
            <h3 className='text-2xl font-bold mb-3'>{mail.subject} </h3>
            <p className='text-sm text-muted-foreground'>
              {moment(mail.createdAt).format('DD-MM-YYYY')}
            </p>
          </div>
          <p className='text-sm text-muted-foreground'>
            From:
            <span className='font-bold text-md ml-2'>{mail.sender.email}</span>
          </p>
          <p className='text-sm text-muted-foreground'>
            To:
            <span className='font-bold text-md ml-2'>
              {mail?.recipients[0]?.recipient?.email}
            </span>
          </p>
        </div>

        <Separator orientation='horizontal' className='mt-2 mb-4' />

        <p className='text-sm whitespace-pre-wrap'>{mail.body}</p>
      </article>
    </section>
  );
};

export default MailDetails;
