import {
  HeartIcon,
  InboxIcon,
  MessageSquareIcon,
  SendToBackIcon,
} from 'lucide-react';
import MailNavLink from './MailNavLink';
import { MailLink, MessageCounts } from '@/types/mail';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import MailSectionHeading from '../MailSectionHeading';
import { Separator } from '@/components/ui/separator';
import MailSectionHeader from '../MailSectionHeader';

function MailNav({ counts }: { counts: MessageCounts }) {
  const links: MailLink[] = [
    {
      title: 'Inbox',
      label: counts.total.toString(),
      url: '/mail/inbox',
      icon: InboxIcon,
    },
    {
      title: 'Sent',
      label: counts.sent.toString(),
      url: '/mail/sent',
      icon: SendToBackIcon,
    },
    {
      title: 'Saved',
      label: counts.saved.toString(),
      url: '/mail/saved',
      icon: HeartIcon,
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
        <Link
          to='/mail/new'
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white mx-2 mt-auto'
          )}
        >
          <MessageSquareIcon className='mr-2 h-4 w-4' />
          <span>New message</span>
        </Link>
      </div>
    </section>
  );
}

export default MailNav;
