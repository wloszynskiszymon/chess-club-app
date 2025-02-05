import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MailContent } from '@/types/mail';
import { SearchIcon } from 'lucide-react';
import MailsList from './MailsList';
import MailSectionHeading from '../MailSectionHeading';
import MailSectionHeader from '../MailSectionHeader';

const MailListSection = ({ mails }: { mails: MailContent[] }) => {
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
      <MailsList mails={mails} />
    </section>
  );
};

export default MailListSection;
