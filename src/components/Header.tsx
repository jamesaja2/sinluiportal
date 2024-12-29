import React, { useState } from 'react';
import SinluiLogo from '../assets/sinlui-logo.svg';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ currentTab, onTabChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#2a2a2a] to-[#3a3a3a] border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <MobileMenu 
              currentTab={currentTab}
              onTabChange={onTabChange}
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
            <img src={SinluiLogo} alt="Sinlui Portal" className="h-8" />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;