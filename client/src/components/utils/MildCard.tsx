import { cn } from '@/lib/utils';

type MildCardProps = React.HTMLProps<HTMLDivElement> & {
  title: string;
  description: string;
  footer?: string;
};

const MildCard = ({
  title,
  description,
  footer,
  className = '',
  ...props
}: MildCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        `${className} text-sm hover:bg-gray-100 p-2 md:p-4 rounded-md border border-gray-100 shadow-sm overflow-hidden`
      )}
    >
      <h3 className='font-semibold text-md md:text-lg'>{title}</h3>
      <p className='line-clamp-3 text-ellipsis text-xs md:text-sm lg:text-md '>
        {description}
      </p>
      <p className='text-muted-foreground text-xs md:text-sm lg:text-md'>
        {footer}
      </p>
    </div>
  );
};

export default MildCard;
