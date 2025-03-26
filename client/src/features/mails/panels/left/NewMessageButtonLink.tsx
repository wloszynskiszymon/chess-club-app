import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { MessageSquareIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
type NewMessageButtonLinkProps = React.ComponentProps<'a'> & {
  buttonVariantsObject?: VariantProps<typeof buttonVariants>;
};
const NewMessageButtonLink = ({
  className = '',
  buttonVariantsObject = {
    variant: 'outline',
    size: 'sm',
  },
}: NewMessageButtonLinkProps) => {
  return (
    <Link
      to='/mail/new'
      className={cn(
        buttonVariants(buttonVariantsObject),
        `dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white ${className}`
      )}
    >
      <MessageSquareIcon className='mr-2 h-4 w-4' />
      <span>New message</span>
    </Link>
  );
};

export default NewMessageButtonLink;
