import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AnnouncementPage from './components/AnnouncementPage';
import Footer from './components/Footer';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <div className="flex flex-1">
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
        <div className="flex-1">
          {currentTab === 'home' ? (
            <MainContent />
          ) : (
            <AnnouncementPage />
          )}
        </div>
      </div>
      
      <Footer logoUrl="https://smakstlouis1sby.sch.id/storage/2020/03/buat-web-1.png" /> {/* Add your logo URL here */}
    </div>
  );
}

export default App;