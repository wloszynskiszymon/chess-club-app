import React, { useState } from 'react';
import { AuthContext } from '../hooks/useAuth';
import { queryClient } from '@/App';
import api from '@/api/axios';
import { redirect } from 'react-router-dom';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  const logout = async () => {
    const res = await api.get('/auth/logout');
    setToken(undefined);
    queryClient.clear();
    if (res.status === 200) {
      redirect('/auth/login');
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
