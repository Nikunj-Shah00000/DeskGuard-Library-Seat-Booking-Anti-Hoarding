import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (asAdmin?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (asAdmin = false) => {
    setUser({
      uid: 'demo-user-001',
      name: asAdmin ? 'Librarian Admin' : 'Arjun Mehta',
      email: asAdmin ? 'admin@library.edu' : 'arjun@library.edu',
      photoURL: undefined,
      role: asAdmin ? 'admin' : 'student',
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === 'admin', login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
