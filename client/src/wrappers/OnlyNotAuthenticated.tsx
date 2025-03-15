import useAuth from '@/hooks/useAuth';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const OnlyNotAuthenticated = ({
  children,
}: {
  children: ReactElement<any, any>;
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return children;

  return <Navigate to='/' replace />;
};

export default OnlyNotAuthenticated;
