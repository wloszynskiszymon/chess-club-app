import FilterMailsList from './FilterMailsList';
import useMailUrl from '@/features/mails/hooks/useMailUrl';
import MailSectionHeader from '@/features/mails/components/MailSectionHeader';
import MailSectionHeading from '@/features/mails/components/MailSectionHeading';
import SearchInput from '@/features/mails/panels/middle/SearchMailInput';
import SearchResultMails from './SearchResultMails';
import { Separator } from '@/components/ui/separator';

const MiddlePanel = () => {
  const { mailId, isSearchingMail } = useMailUrl();

  return (
    <section className='h-full'>
      <MailSectionHeader>
        <MailSectionHeading>
          {isSearchingMail ? 'Search your Inbox' : 'Your inbox'}
        </MailSectionHeading>
      </MailSectionHeader>

      <Separator />

      <div className='px-2 my-4'>
        <SearchInput />
      </div>
      {!isSearchingMail && <FilterMailsList activeMailId={mailId as string} />}

      {isSearchingMail && <SearchResultMails activeMailId={mailId as string} />}
    </section>
  );
};

export default MiddlePanel;
