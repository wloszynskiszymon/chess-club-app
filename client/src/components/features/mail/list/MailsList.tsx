import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail } from '@/types/mail';

const MailsList = ({ mails }: { mails: Mail[] }) => {
  return (
    <ScrollArea className='h-full pl-2 pr-4 pb-32'>
      {mails.map(mail => (
        <Card
          key={mail.id}
          className='px-4 py-2 h-36 bg-gray-50 hover:bg-muted mb-2 cursor-pointer'
        >
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold line-clamp-1'>
              {mail.subject}
            </h2>
            <p className='text-muted-foreground text-nowrap pl-4 text-sm'>
              {mail.date}
            </p>
          </div>
          <p className='text-muted-foreground line-clamp-1 text-sm mb-2'>
            From: <span className='text-black text-md'>{mail.from}</span>
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
