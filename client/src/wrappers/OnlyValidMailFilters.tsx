import { appConfig } from '@/lib/config';
import { PropsWithChildren } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const OnlyValidMailFilters = ({ children }: PropsWithChildren) => {
  const { filter } = useParams();
  if (!filter)
    throw new Error('Filter is missing, component cannot be used here!');

  const isValid =
    appConfig.mail.filters.includes(filter as 'received' | 'sent' | 'saved') ||
    filter === 'new';

  if (!isValid) return <Navigate to={`/mail/received`} replace />;

  return children;
};

export default OnlyValidMailFilters;
