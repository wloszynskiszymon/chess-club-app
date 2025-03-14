import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const useMailUrl = () => {
  const location = useLocation();
  const { category, mailId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!category) {
    throw new Error(
      'Category or mailId is missing, component cannot be used here!'
    );
  }

  const isReceived = location.pathname.includes('/mail/received');
  const isSent = location.pathname.includes('/mail/sent');
  const isSaved = location.pathname.includes('/mail/saved');
  const isNewMail = location.pathname.includes('/mail/new');
  const isSearchingMail = searchParams.has('q');

  return {
    isReceived,
    isSent,
    isSaved,
    isNewMail,
    category,
    mailId,
    searchParams,
    setSearchParams,
    isSearchingMail,
  };
};

export default useMailUrl;
