import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MailLink } from '@/types/mail';
import { Link, useLocation } from 'react-router-dom';

const MailNavLink = ({ link }: { link: MailLink }) => {
  const { pathname } = useLocation();
  const isActive = link.url === pathname;

  return (
    <Link
      to={link.url}
      className={cn(
        buttonVariants({ variant: isActive ? 'default' : 'ghost', size: 'sm' }),
        isActive &&
          'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
        'justify-start'
      )}
    >
      <link.icon className='mr-2 h-4 w-4' />
      {link.title}
      {link.label && (
        <span
          className={cn(
            'ml-auto',
            isActive && 'text-background dark:text-white'
          )}
        >
          {link.label}
        </span>
      )}
    </Link>
  );
};

export default MailNavLink;
