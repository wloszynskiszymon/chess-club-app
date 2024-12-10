import { createContext, useContext } from 'react';

interface AuthContextType {
  token?: string;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};

export default useAuth;
