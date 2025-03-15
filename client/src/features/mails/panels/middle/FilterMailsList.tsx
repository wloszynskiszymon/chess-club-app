import MailsList from './MailsList';
import { MailMiddlePanelProps } from '@/types/mail';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useInfiniteMailsQuery from '../../hooks/useInfiniteMails';
import useMailUrl from '../../hooks/useMailUrl';

// URL: /mail/received
const FilterMailsList = (props: MailMiddlePanelProps) => {
  const { filter } = useMailUrl();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteMailsQuery({ filter: filter });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const mails = data?.pages.flat() || [];

  return (
    <MailsList
      mails={mails}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      loadingRef={ref}
      {...props}
    />
  );
};

export default FilterMailsList;
