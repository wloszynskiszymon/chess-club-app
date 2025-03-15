import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { MailFilter } from '@/types/mail';

const useMailUrl = () => {
  const location = useLocation();
  const { filter: rawFilter, mailId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!rawFilter) {
    throw new Error('Filter or mailId is missing, hook cannot be used here!');
  }

  const filter = rawFilter as MailFilter;
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
    filter,
    mailId,
    searchParams,
    setSearchParams,
    isSearchingMail,
  };
};

export default useMailUrl;
