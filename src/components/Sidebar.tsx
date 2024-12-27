import React from 'react';
import { Home, Bell } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ currentTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-[#2a2a2a] p-4 space-y-2 hidden md:block">
      <div 
        className={`sidebar-item ${currentTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </div>
      <div 
        className={`sidebar-item ${currentTab === 'announcement' ? 'active' : ''}`}
        onClick={() => onTabChange('announcement')}
      >
        <Bell className="w-5 h-5" />
        <span>Announcement</span>
      </div>
    </aside>
  );
};

export default Sidebar;