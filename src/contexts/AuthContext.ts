import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, GoogleCredentialResponse } from '../types/auth';
import { AUTH_CONFIG } from '../config/auth';
import { decodeJwt } from '../utils/jwt';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    const decoded = decodeJwt(response.credential);
    const email = decoded.email as string;
    const domain = email.split('@')[1];

    let role: 'teacher' | 'student';
    if (domain === AUTH_CONFIG.TEACHER_DOMAIN) {
      role = 'teacher';
    } else if (domain === AUTH_CONFIG.STUDENT_DOMAIN) {
      role = 'student';
    } else {
      console.error('Invalid email domain');
      return;
    }

    setUser({
      id: decoded.sub as string,
      name: decoded.name as string,
      email: email,
      picture: decoded.picture as string,
      role: role
    });
  };

  useEffect(() => {
    const initializeGoogleAuth = async () => {
      try {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.onload = () => resolve();
          document.body.appendChild(script);
        });

        window.google.accounts.id.initialize({
          client_id: AUTH_CONFIG.GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Google Auth:', error);
        setIsLoading(false);
      }
    };

    initializeGoogleAuth();
  }, []);

  const login = async () => {
    window.google.accounts.id.prompt();
  };

  const logout = async () => {
    window.google.accounts.id.revoke(user?.email || '', () => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};