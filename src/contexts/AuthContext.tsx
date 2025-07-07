import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  uid: string;
  name: string;
  email: string;
  plan?: 'free' | 'monthly' | 'yearly';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, plan?: 'free' | 'monthly' | 'yearly') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('hela_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      uid: 'mock_uid_123',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      plan: 'free' // Default to free plan for existing users
    };
    
    setUser(mockUser);
    localStorage.setItem('hela_user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string, plan: 'free' | 'monthly' | 'yearly' = 'free'): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      uid: 'mock_uid_123',
      name: name,
      email: email,
      plan: plan // Use the selected plan, defaults to free
    };
    
    setUser(mockUser);
    localStorage.setItem('hela_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hela_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};