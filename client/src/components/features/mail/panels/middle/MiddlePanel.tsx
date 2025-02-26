import { NavCategory } from '../../types/mail';
import ReceivedMails from './ReceivedMails';
import SentMails from './SentMails';
import SavedMails from './SavedMails';
import useMailUrl from '@/components/features/hooks/useMailUrl';

export type MiddlePanelProps = {
  category: NavCategory;
  activeMailId: string | undefined;
};

const MiddlePanel = () => {
  const { isInbox, isSaved, isSent, mailId, category } = useMailUrl();
  return (
    <>
      {isInbox && (
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
    </>
  );
};

export default MiddlePanel;
