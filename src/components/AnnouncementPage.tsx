import React from 'react';
import { Bell, Pin } from 'lucide-react';

const AnnouncementPage = () => {
  const announcements = [
    {
      title: 'Cobacoba ulalala',
      content: 'Hello',
      date: '17-08-2025',
      isPinned: true,
    },
    {
      title: 'Halo Guys',
      content: 'Tes1234',
      date: '14-03-2024',
      isPinned: true,
    },
    // Kalau mau add tinggal copas format yang diatas ya!
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Announcements</h2>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="bg-[#2a2a2a] rounded-lg p-4 hover:bg-[#3a3a3a] transition-colors">
            <div className="flex items-start gap-4">
              {announcement.isPinned && (
                <Pin className="w-5 h-5 text-blue-400 shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium truncate">{announcement.title}</h3>
                  <span className="text-sm text-gray-400">{announcement.date}</span>
                </div>
                <p className="text-sm text-gray-300">{announcement.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementPage;