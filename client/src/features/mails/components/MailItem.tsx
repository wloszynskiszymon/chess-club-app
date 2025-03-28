import { Mail } from '@/types/mail';
import MailDate from './MailDate';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type MailItemProps = React.HTMLProps<HTMLDivElement> & {
  mail: Mail;
};

const MailItem = ({ mail, className = '', ...props }: MailItemProps) => {
  const navigate = useNavigate();
  const handleNavigation = (mailId: string) => {
    navigate(`/mail/received/${mailId}`);
  };

  return (
    <div
      {...props}
      className={cn(
        `${className} w-full py-2 not:border-b hover:bg-gray-100 cursor-pointer`
      )}
      onClick={() => handleNavigation(mail.id)}
    >
      <p className='font-bold text-ellipsis text-nowrap line-clamp-1'>
        {mail.subject}
      </p>
      <p className='text-sm text-gray-800  text-ellipsis text-nowrap line-clamp-1'>
        {mail.sender.email}
      </p>
      <MailDate date={mail.createdAt} format='ago' />
    </div>
  );
};

export default MailItem;
