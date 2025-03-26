import { Mail } from '@/types/mail';
import MailDate from './MailDate';

type MailItemProps = {
  mail: Mail;
};

const MailItem = ({ mail }: MailItemProps) => {
  return (
    <div className='w-full  py-2 not:border-b'>
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
