import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storage } from '../storage/mmkv';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const USER_INFO_KEY = 'USER_INFO';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = storage.getString(AUTH_TOKEN_KEY);
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string) => {
    setIsLoading(true);
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    const mockToken = `mock-token-${Date.now()}`;
    storage.set(AUTH_TOKEN_KEY, mockToken);
    storage.set(USER_INFO_KEY, JSON.stringify({ username }));
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    storage.remove(AUTH_TOKEN_KEY);
    storage.remove(USER_INFO_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
