import { useLocation, useParams } from 'react-router-dom';

const useMailUrl = () => {
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
  const isNewMail = location.pathname.includes('/mail/new');

  return {
    isInbox,
    isSent,
    isSaved,
    isNewMail,
    category,
    mailId,
  };
};

export default useMailUrl;
