import React from 'react';
import announcement from '../assets/announcement.png';

const AnnouncementSection = ({ className = '' }: { className?: string }) => {
  const announcements = [
    {
      title: 'Haloha',
      content: 'Akses e-book, materi, dan tugas',
      isPinned: true,
    }
  ];

  return (
    <section className={`bg-[#2a2a2a] rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <img src={announcement} alt="" className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Announcement</h2>
      </div>
      
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="flex items-start gap-4">
            {announcement.isPinned && (
              <div className="w-5 h-5 text-blue-400 shrink-0">📌</div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-medium truncate">{announcement.title}</h3>
              <p className="text-sm text-gray-400">{announcement.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementSection;
