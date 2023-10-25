import React, { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextType {
  assignmentId: string | null;
  setAssignmentId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [assignmentId, setAssignmentId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ assignmentId, setAssignmentId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAssignment = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('assignmentId must be used within a UserProvider');
  }
  return context;
};