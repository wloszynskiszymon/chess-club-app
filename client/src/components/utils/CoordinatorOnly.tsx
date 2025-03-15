import React from 'react';
import useUserQuery from '@/hooks/queries/user/useUserQuery';

const CoordinatorOnly = ({ children }: React.PropsWithChildren) => {
  const { data, isSuccess } = useUserQuery();

  if (data?.role === 'COORDINATOR' && isSuccess) return <>{children}</>;
  return null;
};

export default CoordinatorOnly;
