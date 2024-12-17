import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface JoinClubContextType {
  isJoining: boolean;
  setIsJoining: (state: boolean) => void;
}

const JoinClubContext = createContext<JoinClubContextType | undefined>(
  undefined
);

export const JoinClubProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isJoining, setIsJoining] = useState(false);

  return (
    <JoinClubContext.Provider value={{ isJoining, setIsJoining }}>
      {children}
    </JoinClubContext.Provider>
  );
};

export const useJoinClubContext = () => {
  const context = useContext(JoinClubContext);
  if (!context) {
    throw new Error(
      'useJoinClubContext must be used within a JoinClubProvider'
    );
  }
  return context;
};
