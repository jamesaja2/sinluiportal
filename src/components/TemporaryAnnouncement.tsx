import React from 'react';
import { Megaphone } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { ANNOUNCEMENTS, AnnouncementType } from '../types/announcement';

const TemporaryAnnouncement = () => {
  const { user } = useAuth();
  
  // Determine which announcement to show based on user role
  let announcementType: AnnouncementType = 'public';
  if (user?.role === 'student') {
    announcementType = 'student';
  } else if (user?.role === 'teacher') {
    announcementType = 'teacher';
  }

  const announcement = ANNOUNCEMENTS[announcementType];

  if (!announcement.active || !announcement.message) {
    return null;
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 p-4 rounded-lg mb-6 flex items-start gap-3">
      <Megaphone className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        <div className="font-medium mb-1">
          {announcementType === 'public' ? 'Announcement' : 
           announcementType === 'student' ? 'Student Announcement' : 
           'Teacher Announcement'}
        </div>
        <div>{announcement.message}</div>
      </div>
    </div>
  );
}

export default TemporaryAnnouncement;