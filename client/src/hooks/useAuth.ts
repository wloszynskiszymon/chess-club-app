import { createContext, useContext } from 'react';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  role: string;
}

interface AuthContextType {
  token?: string;
  setToken: (token: string | undefined) => void;
  isAuthenticated: boolean;
  logout: () => void;
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
