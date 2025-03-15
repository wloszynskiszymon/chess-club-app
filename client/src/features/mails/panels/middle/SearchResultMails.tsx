import useMailsQuery from '@/hooks/queries/mail/useMailsQuery';
import MailsList from './MailsList';
import { MiddlePanelProps } from './MiddlePanel';
import useMailUrl from '@/features/mails/hooks/useMailUrl';
import { NavCategory } from '@/features/mails/types/mail';

// URL: /mail/:category/q=:query
const SearchResultMails = (props: MiddlePanelProps) => {
  const { category, searchParams } = useMailUrl();
  const query = searchParams.get('q');

  const { data, isLoading } = useMailsQuery({
    filter: category as NavCategory,
    query: query ? query : undefined,
  });
  if (searchParams.has('q') && query?.length === 0)
    return (
      <div className='text-center text-gray-500 text-sm'>
        Please enter a search query
      </div>
    );

  return (
    <MailsList
      callbackText='No results found'
      mails={data || []}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default SearchResultMails;
