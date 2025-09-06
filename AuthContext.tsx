import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, Admin } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, userType: 'user' | 'admin') => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    admin: null,
    userType: null,
  });

  useEffect(() => {
    // Check for existing session
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuthState(parsedAuth);
      } catch (error) {
        console.error('Error parsing saved auth:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = async (email: string, password: string, userType: 'user' | 'admin'): Promise<boolean> => {
    // Simulate authentication
    if (userType === 'admin') {
      if (email === 'admin@curfew.gov' && password === 'admin123') {
        const admin: Admin = {
          id: '1',
          username: 'admin',
          email,
          role: 'admin',
        };
        const newAuthState = {
          isAuthenticated: true,
          user: null,
          admin,
          userType: 'admin' as const,
        };
        setAuthState(newAuthState);
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        return true;
      }
    } else {
      // For demo purposes, any email/password combination works for users
      if (email && password) {
        const user: User = {
          id: Date.now().toString(),
          email,
          fullName: email.split('@')[0],
          phone: '1234567890',
          address: 'Demo Address',
          createdAt: new Date().toISOString(),
        };
        const newAuthState = {
          isAuthenticated: true,
          user,
          admin: null,
          userType: 'user' as const,
        };
        setAuthState(newAuthState);
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        return true;
      }
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    // Simulate registration
    const user: User = {
      id: Date.now().toString(),
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date().toISOString(),
    };
    const newAuthState = {
      isAuthenticated: true,
      user,
      admin: null,
      userType: 'user' as const,
    };
    setAuthState(newAuthState);
    localStorage.setItem('auth', JSON.stringify(newAuthState));
    return true;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      admin: null,
      userType: null,
    });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
};