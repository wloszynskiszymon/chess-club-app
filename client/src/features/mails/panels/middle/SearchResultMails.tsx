import MailsList from './MailsList';
import useMailUrl from '@/features/mails/hooks/useMailUrl';
import { MailMiddlePanelProps, MailFilter } from '@/types/mail';
import useInfiniteMailsQuery from '../../hooks/useInfiniteMails';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// URL: /mail/:filter/q=:query
const SearchResultMails = (props: MailMiddlePanelProps) => {
  const { filter, searchParams } = useMailUrl();
  const { ref, inView } = useInView();

  const query = searchParams.get('q');

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteMailsQuery({
      filter: filter as MailFilter,
      query: query ? query : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const mails = data?.pages.flat() || [];

  if (searchParams.has('q') && query?.length === 0)
    return (
      <div className='text-center text-gray-500 text-sm'>
        Please enter a search query
      </div>
    );

  return (
    <MailsList
      callbackText='No results found'
      filter={filter}
      mails={mails || []}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      loadingRef={ref}
      {...props}
    />
  );
};

export default SearchResultMails;
