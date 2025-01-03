import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserInfo, AuthContextType } from '../types/user';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const determineRole = (email: string) => {
    if (email.endsWith('@s.smakstlouis1sby.sch.id')) return 'student';
    if (email.endsWith('@smakstlouis1sby.sch.id')) return 'teacher';
    return null;
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const role = determineRole(userInfo.data.email);
        
        setUser({
          name: userInfo.data.name,
          email: userInfo.data.email,
          picture: userInfo.data.picture,
          role
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Login Failed:', errorResponse);
    }
  });

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};