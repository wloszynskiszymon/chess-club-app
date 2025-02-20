import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/mail';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const MailsList = ({ mails }: { mails: Message[] }) => {
  const navigate = useNavigate();
  const { category, mailId } = useParams();

  const handleClick = (id: string) => {
    navigate(`/mail/${category}/${id}`);
  };

  return (
    <ScrollArea className='h-full pl-2 pr-4 pb-32'>
      {mails.map(mail => (
        <Card
          key={mail.id}
          onClick={handleClick.bind(null, mail.id)}
          className={`px-4 py-2 h-36  hover:bg-muted mb-2 cursor-pointer ${
            mailId === mail.id ? 'bg-muted' : 'bg-gray-50'
          }`}
        >
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold line-clamp-1'>
              {mail.subject}
            </h2>
            <p className='text-muted-foreground text-nowrap pl-4 text-sm'>
              {moment(mail.createdAt).format('DD-MM-YYYY')}
            </p>
          </div>
          <p className='text-muted-foreground line-clamp-1 text-sm mb-2'>
            From:{' '}
            <span className='text-black text-md'>{mail.sender.email}</span>
          </p>
          <p className='text-muted-foreground line-clamp-3 text-sm mb-2'>
            {mail.body}
          </p>
        </Card>
      ))}
    </ScrollArea>
  );
};

export default MailsList;
