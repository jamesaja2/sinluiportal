import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  CredentialResponse,
  googleLogout,
  useGoogleOneTapLogin,
  useGoogleLogin
} from '@react-oauth/google';
import axios from 'axios';
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cachedUser = useMemo(() => {
    const cachedUserData = localStorage.getItem('cachedUser');
    if (cachedUserData) {
      try {
        const parsedUser = JSON.parse(cachedUserData) as UserInfo;
        if (parsedUser.exp < Date.now() / 1000) {
          return null;
        }
        return parsedUser;
      } catch (e) {
        console.error('Error parsing cached user data:', e);
        return null;
      }
    }
    return null;
  }, []);

  const [user, setUserState] = useState<UserInfo | null>(cachedUser);

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

  const determineRole = (email: string) => {
    if (email.endsWith('@s.smakstlouis1sby.sch.id')) return 'student';
    if (email.endsWith('@smakstlouis1sby.sch.id')) return 'teacher';
    return null;
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      console.error('No credential returned');
      return;
    }

    try {
      const decoded = jwtDecode<GoogleAccessToken>(credentialResponse.credential);
      const userInfo: UserInfo = {
        sub: decoded.email,
        name: decoded.name,
        familyName: decoded.family_name,
        givenName: decoded.given_name,
        picture: decoded.picture,
        exp: decoded.exp,
        isAdmin: false,
      };

      const role = determineRole(decoded.email);
      setUser({ ...userInfo, role });

      const backendUserLogin = await client.auth.$post(
        {
          json: {
            idToken: credentialResponse.credential,
          },
        },
        { init: { credentials: 'include' } }
      );

      if (!backendUserLogin.ok) {
        console.error('Error logging user in from backend:', await backendUserLogin.text());
        return;
      }

      const backendUserInfo = await client.api.private.user.$get(
        {},
        { init: { credentials: 'include' } }
      );

      if (!backendUserInfo.ok) {
        console.error('Error fetching user info from backend:', await backendUserInfo.text());
        return;
      }

      const backendUser = await backendUserInfo.json();
      setUser({ ...userInfo, ...backendUser, role });
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
    googleLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, onGoogleLoginSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};
