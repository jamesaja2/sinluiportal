import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AnnouncementPage from './components/AnnouncementPage';
import Footer from './components/Footer';
import { features } from './config/features';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />
        
        <div className="flex flex-1">
          {features.showSidebar && (
            <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
          )}
          <div className="flex-1">
            {currentTab === 'home' ? (
              <MainContent />
            ) : (
              <AnnouncementPage />
            )}
          </div>
        </div>
        
        <Footer logoUrl="https://smakstlouis1sby.sch.id/storage/2020/03/buat-web-1.png" logoWidth="70px" logoHeight="70px" />
      </div>
    </AuthProvider>
  );
}

export default App;


