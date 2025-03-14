import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageSquareIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
type NewMessageButtonLinkProps = React.ComponentProps<'a'>;
const NewMessageButtonLink = ({
  className = '',
}: NewMessageButtonLinkProps) => {
  return (
    <Link
      to='/mail/new'
      className={cn(
        buttonVariants({
          variant: 'outline',
          size: 'sm',
        }),
        `dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white ${className}`
      )}
    >
      <MessageSquareIcon className='mr-2 h-4 w-4' />
      <span>New message</span>
    </Link>
  );
};

export default NewMessageButtonLink;
