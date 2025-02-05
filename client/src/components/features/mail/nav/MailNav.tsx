import {
  ArchiveIcon,
  InboxIcon,
  MessageSquareIcon,
  SendToBackIcon,
} from 'lucide-react';
import MailNavLink from './MailNavLink';
import { MailLink } from '@/types/mail';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const links: MailLink[] = [
  {
    title: 'Inbox',
    label: '0',
    url: '/mail/inbox',
    icon: InboxIcon,
  },
  {
    title: 'Sent',
    label: '0',
    url: '/mail/sent',
    icon: SendToBackIcon,
  },
  {
    title: 'Saved',
    label: '0',
    url: '/mail/saved',
    icon: ArchiveIcon,
  },
];

function MailNav() {
  return (
    <div className='group flex flex-col flex-1 gap-4 py-2'>
      <nav className='flex flex-col flex-1 gap-1 px-2'>
        {links.map((link, index) => (
          <MailNavLink key={index} link={link} />
        ))}
      </nav>
      <Link
        to='#'
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
  );
}

export default MailNav;
