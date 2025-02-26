import { Card } from '@/components/ui/card';
import { Message } from '@/types/mail';
import moment from 'moment';

const MailCard = ({
  activeMailId,
  mail,
  handleClick,
}: {
  activeMailId: string | undefined;
  mail: Message;
  handleClick: (id: string) => void;
}) => {
  return (
    <Card
      key={mail.id}
      onClick={handleClick.bind(null, mail.id)}
      className={`px-4 py-2 h-36  hover:bg-muted mb-2 cursor-pointer ${
        activeMailId === mail.id ? 'bg-muted' : 'bg-gray-50'
      }`}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold line-clamp-1'>{mail.subject}</h2>
        <p className='text-muted-foreground text-nowrap pl-4 text-sm'>
          {moment(mail.createdAt).format('DD-MM-YYYY')}
        </p>
      </div>
      <p className='text-muted-foreground line-clamp-1 text-sm mb-2'>
        From: <span className='text-black text-md'>{mail.sender.email}</span>
      </p>
      <p className='text-muted-foreground line-clamp-3 text-sm mb-2'>
        {mail.body}
      </p>
    </Card>
  );
};

export default MailCard;
