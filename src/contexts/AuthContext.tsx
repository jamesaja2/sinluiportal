import React, { createContext, useState, useMemo, useEffect } from 'react';
import {
  CredentialResponse,
  googleLogout,
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import { UserInfo, AuthContextType } from '../types/user';
import { jwtDecode } from 'jwt-decode';
import { client } from '../utils/api';

export const AuthContext = createContext<AuthContextType | null>(null);

export interface GoogleAccessToken {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Obtain the cached user from local storage
  const cachedUser = useMemo(() => {
    const cachedUserData = localStorage.getItem('cachedUser');

    if (cachedUserData) {
      // Try parsing
      try {
        const parsedUser = JSON.parse(cachedUserData) as UserInfo;

        // Ensure is not past expiration
        if (parsedUser.exp < Date.now() / 1000) {
          return null;
        }

        return parsedUser;
      } catch (e) {
        // If parsing fails, return null
        console.error('Error parsing cached user data:', e);
        return null;
      }
    }

    return null;
  }, []);

  const [user, setUserState] = useState<UserInfo | null>(cachedUser);

  // Lazily check whether the logged in user is valid and update the user state
  useEffect(() => {
    if (!cachedUser) {
      return;
    }

    client.api.private.user
      .$get({}, { init: { credentials: 'include' } })
      .then(async (response) => {
        if (response.ok) {
          setUser(await response.json());
        } else if (response.status === 401) {
          // User is not valid, log them out
          setUser(null);
        }
      })
      .catch((error) => {
        console.error('Error checking user validity:', error);
      });
  }, [cachedUser]);

  const setUser = (user: UserInfo | null) => {
    setUserState(user);
    if (user === null) {
      localStorage.removeItem('cachedUser');
    } else {
      localStorage.setItem('cachedUser', JSON.stringify(user));
    }
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      console.error('No credential returned');
      return;
    }

    try {
      // Decode JWT
      const decoded = jwtDecode<GoogleAccessToken>(
        credentialResponse.credential
      );

      // Translate decoded JWT to offline user info
      const userInfo: UserInfo = {
        sub: decoded.email,
        name: decoded.name,
        familyName: decoded.family_name,
        givenName: decoded.given_name,
        picture: decoded.picture,
        exp: decoded.exp,
        isAdmin: false,
      };
      setUser(userInfo);

      // Login on backend with current credentials
      const backendUserLogin = await client.auth.$post(
        {
          json: {
            idToken: credentialResponse.credential,
          },
        },
        { init: { credentials: 'include' } }
      );

      if (!backendUserLogin.ok) {
        console.error(
          'Error logging user in from backend:',
          await backendUserLogin.text()
        );
        return;
      }

      // Get a more complete user info from backend
      const backendUserInfo = await client.api.private.user.$get(
        {},
        { init: { credentials: 'include' } }
      );

      if (!backendUserInfo.ok) {
        console.error(
          'Error fetching user info from backend:',
          await backendUserInfo.text()
        );
        return;
      }

      const backendUser = await backendUserInfo.json();

      // Update user info with backend user info
      setUser({
        ...userInfo,
        ...backendUser,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useGoogleOneTapLogin({
    auto_select: !cachedUser,
    onSuccess: onGoogleLoginSuccess,
    cancel_on_tap_outside: false,
    disabled: !!cachedUser,
  });

  const logout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, onGoogleLoginSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};
