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

  const isSearchingMail = searchParams.has('q');
  const isReceived =
    location.pathname.includes('/mail/received') && !isSearchingMail;
  const isSent = location.pathname.includes('/mail/sent') && !isSearchingMail;
  const isSaved = location.pathname.includes('/mail/saved') && !isSearchingMail;
  const isNewMail = location.pathname.includes('/mail/new') && !isSearchingMail;

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
