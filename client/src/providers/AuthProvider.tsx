import React, { useState } from 'react';
import { AuthContext } from '../hooks/useAuth';
import { queryClient } from '@/App';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  const logout = () => {
    setToken(undefined);
    queryClient.clear();
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
