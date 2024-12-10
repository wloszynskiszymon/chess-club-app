import React, { useState } from 'react';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
