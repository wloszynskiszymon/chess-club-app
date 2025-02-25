import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Message } from '@/types/mail';
import { SearchIcon } from 'lucide-react';
import MailsList from './MailsList';
import MailSectionHeading from '../MailSectionHeading';
import MailSectionHeader from '../MailSectionHeader';
import useUserQuery from '@/hooks/queries/useUserQuery';
import { useLocation } from 'react-router-dom';
import {
  findUserReceived,
  findUserSaved,
  findUserSent,
} from '../utils/mailUtils';

const MailListSection = ({ mails }: { mails: Message[] }) => {
  const location = useLocation();

  const { data: userData } = useUserQuery();

  const recievedMails = findUserReceived(mails, userData?.email as string);
  const sentMails = findUserSent(mails, userData?.email as string);
  const savedMails = findUserSaved(mails, userData?.email as string);

  const isInbox = location.pathname.includes('/mail/inbox');
  const isSent = location.pathname.includes('/mail/sent');
  const isSaved = location.pathname.includes('/mail/saved');

  return (
    <section className='h-full'>
      <MailSectionHeader>
        <MailSectionHeading>Your inbox</MailSectionHeading>
      </MailSectionHeader>

      <Separator />
      <div className='px-2 my-4'>
        <div className='relative w-full'>
          <SearchIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search' className='pl-8' />
        </div>
      </div>
      {isInbox && recievedMails && <MailsList mails={recievedMails} />}
      {isSent && sentMails && <MailsList mails={sentMails} />}
      {isSaved && savedMails && <MailsList mails={savedMails} />}
    </section>
  );
};

export default MailListSection;
