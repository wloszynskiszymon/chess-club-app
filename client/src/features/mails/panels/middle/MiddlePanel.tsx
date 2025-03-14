import { NavCategory } from '../../types/mail';
import ReceivedMails from './ReceivedMails';
import SentMails from './SentMails';
import SavedMails from './SavedMails';
import useMailUrl from '@/features/mails/hooks/useMailUrl';
import MailSectionHeader from '@/features/mails/components/MailSectionHeader';
import MailSectionHeading from '@/features/mails/components/MailSectionHeading';
import { Separator } from '@radix-ui/react-select';
import SearchInput from '@/features/mails/panels/middle/SearchMailInput';
import SearchResultMails from './SearchResultMails';

export type MiddlePanelProps = {
  category: NavCategory;
  activeMailId: string | undefined;
};

const MiddlePanel = () => {
  const { isReceived, isSaved, isSent, mailId, category, isSearchingMail } =
    useMailUrl();

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
      {isReceived && (
        <ReceivedMails
          category={category as NavCategory}
          activeMailId={mailId}
        />
      )}
      {isSent && (
        <SentMails category={category as NavCategory} activeMailId={mailId} />
      )}
      {isSaved && (
        <SavedMails category={category as NavCategory} activeMailId={mailId} />
      )}
      {isSearchingMail && (
        <SearchResultMails
          category={category as NavCategory}
          activeMailId={mailId}
        />
      )}
    </section>
  );
};

export default MiddlePanel;
