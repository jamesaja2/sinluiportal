import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types/auth';

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

  useEffect(() => {
    // Initialize Google client
    const initializeGoogleAuth = async () => {
      try {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.onload = resolve;
          document.body.appendChild(script);
        });
        
        // Initialize Google client here when you have the client ID
        window.google.accounts.id.initialize({
           client_id: '953146154384-nrlggfm4qs1agnhlq75l9kpdu88d2ia1.apps.googleusercontent.com',
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
    // Implement Google login
  };

  const logout = async () => {
    setUser(null);
    // Additional logout logic here
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};