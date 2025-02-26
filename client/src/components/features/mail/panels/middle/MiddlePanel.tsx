import { useLocation, useParams } from 'react-router-dom';
import { Category } from '../../types/mail';
import ReceivedMails from './ReceivedMails';
import SentMails from './SentMails';
import SavedMails from './SavedMails';

export type MiddlePanelProps = {
  category: Category;
  activeMailId: string | undefined;
};

const MiddlePanel = () => {
  const location = useLocation();
  const { category, mailId } = useParams();

  if (!category) {
    throw new Error(
      'Category or mailId is missing, component cannot be used here!'
    );
  }

  const isInbox = location.pathname.includes('/mail/inbox');
  const isSent = location.pathname.includes('/mail/sent');
  const isSaved = location.pathname.includes('/mail/saved');

  return (
    <>
      {isInbox && (
        <ReceivedMails category={category as Category} activeMailId={mailId} />
      )}
      {isSent && (
        <SentMails category={category as Category} activeMailId={mailId} />
      )}
      {isSaved && (
        <SavedMails category={category as Category} activeMailId={mailId} />
      )}
    </>
  );
};

export default MiddlePanel;
