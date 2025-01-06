import React from 'react';
import ServiceCard from './ServiceCard';
import AnnouncementSection from './AnnouncementSection';
import CalendarSection from './CalendarSection';
import { useAuth } from '../contexts/useAuth';
import { useLinks } from '../hooks/useLinks';
import apps from '../assets/apps.png';

const MainContent = () => {
  const { user } = useAuth();
  const { links, isLoading, error } = useLinks();

  return (
    <main className="flex-1 p-6 max-w-6xl mx-auto">
      {user && (
        <h1 className="text-2xl font-semibold mb-6">
          Selamat Datang, {user.name}
        </h1>
      )}
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <img src={apps} alt="" className="w-6 h-6" />
            Applications and Services
          </h2>
          {error && (
            <span className="text-sm text-gray-400">{error}</span>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          links.map(category => (
            <div key={category.id || category.name} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.links.map((link, index) => (
                  <ServiceCard key={index} {...link} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <AnnouncementSection className="lg:col-span-2" />
        <CalendarSection />
      </div>
    </main>
  );
};

export default MainContent;