import useMessagesQuery from '@/hooks/queries/useMessagesQuery';
import MailsList from './MailsList';
import { MiddlePanelProps } from './MiddlePanel';
import MailListSkeleton from '@/features/mails/components/skeleton/MailListSkeleton';
import useMailUrl from '@/features/mails/hooks/useMailUrl';
import { NavCategory } from '@/features/mails/types/mail';

// URL: /mail/:category/q=:query
const SearchResultMails = (props: MiddlePanelProps) => {
  const { category, searchParams } = useMailUrl();
  const query = searchParams.get('q');

  const { data } = useMessagesQuery({
    filter: category as NavCategory,
    query: query ? query : undefined,
  });
  if (searchParams.has('q') && query?.length === 0)
    return (
      <div className='text-center text-gray-500 text-sm'>
        Please enter a search query
      </div>
    );

  if (!data) return <MailListSkeleton amount={5} />;
  if (data.length === 0)
    return (
      <div className='text-center text-gray-500 text-sm'>No mails found</div>
    );
  return <MailsList mails={data} {...props} />;
};

export default SearchResultMails;
