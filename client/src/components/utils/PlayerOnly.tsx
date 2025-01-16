import React from 'react';
import useUserQuery from '../../hooks/queries/useUserQuery';

const PlayerOnly = ({ children }: React.PropsWithChildren) => {
  const { data, isSuccess } = useUserQuery();

  if (data?.role === 'CHESS_PLAYER' && isSuccess) return <>{children}</>;
  return <></>;
};

export default PlayerOnly;
