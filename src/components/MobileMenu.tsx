import React from 'react';
import { Menu } from 'lucide-react';
import home from '../assets/home.png';
import announcement from '../assets/announcement.png';

interface MobileMenuProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenu = ({ currentTab, onTabChange, isOpen, onToggle }: MobileMenuProps) => {
  return (
    <div className="md:hidden">
      <button 
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#2a2a2a] border-b border-gray-700">
          <div 
            className={`p-4 cursor-pointer ${currentTab === 'home' ? 'bg-gray-700/50' : ''}`}
            onClick={() => {
              onTabChange('home');
              onToggle();
            }}
          >
            <div className="flex items-center gap-3">
              <img src={home} alt="" className="w-6 h-6" />
              <span>Home</span>
            </div>
          </div>
          <div 
            className={`p-4 cursor-pointer ${currentTab === 'announcement' ? 'bg-gray-700/50' : ''}`}
            onClick={() => {
              onTabChange('announcement');
              onToggle();
            }}
          >
            <div className="flex items-center gap-3">
              <img src={announcement} alt="" className="w-6 h-6" />
              <span>Announcement</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
