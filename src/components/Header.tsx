import React from 'react';
import { useAuth } from '../contexts/useAuth';
import SinluiLogo from '../assets/sinlui-logo.svg';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { LogOut } from 'lucide-react'; // Menggunakan ikon dari lucide-react

const Header = () => {
  const { user, logout, onGoogleLoginSuccess } = useAuth();

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-[#2a2a2a] to-[#3a3a3a] border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/">
              <img src={SinluiLogo} alt="Sinlui Portal" className="h-8 cursor-pointer" />
            </a>
          </div>
          {!user && (
            <GoogleLogin
              onSuccess={onGoogleLoginSuccess}
              useOneTap
              auto_select
            />
          )}
          {user && (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
