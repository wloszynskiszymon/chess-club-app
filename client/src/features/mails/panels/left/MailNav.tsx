import { HeartIcon, InboxIcon, SendToBackIcon } from 'lucide-react';
import MailNavLink from './MailNavLink';
import { MailLink } from '@/types/mail';
import MailSectionHeading from '../../components/MailSectionHeading';
import { Separator } from '@/components/ui/separator';
import MailSectionHeader from '../../components/MailSectionHeader';
import useMailsCounts from '@/hooks/queries/mail/useMailsCounts';
import { useQueryClient, QueryClient } from '@tanstack/react-query';
import { getMails } from '@/api/mail';
import { MailFilter } from '@/types/mail';
import NewMessageButtonLink from './NewMessageButtonLink';

const prefetchMail = (queryClient: QueryClient, mailType: MailFilter) => {
  const queryKey = ['mails', mailType];
  const queryState = queryClient.getQueryState(queryKey);
  if (!queryState) {
    queryClient.prefetchQuery({
      queryKey,
      queryFn: () => getMails(mailType),
    });
  }
};

function MailNav() {
  const { data: counts } = useMailsCounts();
  const queryClient = useQueryClient();

  const links: MailLink[] = [
    {
      title: 'Received',
      label: counts?.unread.toString() || '0',
      url: '/mail/received',
      icon: InboxIcon,
      prefetch: () => prefetchMail(queryClient, 'received'),
    },
    {
      title: 'Sent',
      label: counts?.sent.toString() || '0',
      url: '/mail/sent',
      icon: SendToBackIcon,
      prefetch: () => prefetchMail(queryClient, 'sent'),
    },
    {
      title: 'Saved',
      label: counts?.saved.toString() || '0',
      url: '/mail/saved',
      icon: HeartIcon,
      prefetch: () => prefetchMail(queryClient, 'saved'),
    },
  ];

  return (
    <section className='flex flex-col flex-1'>
      <MailSectionHeader>
        <MailSectionHeading>Mail</MailSectionHeading>
      </MailSectionHeader>
      <Separator className='mb-2' />
      <div className='group flex flex-col flex-1 my-2'>
        <nav className='flex flex-col flex-1 gap-2 px-2'>
          {links.map((link, index) => (
            <MailNavLink key={index} link={link} />
          ))}
        </nav>
        <NewMessageButtonLink className='mx-2 mt-auto' />
      </div>
    </section>
  );
}

export default MailNav;
