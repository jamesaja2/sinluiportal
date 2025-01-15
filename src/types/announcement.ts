export type AnnouncementType = 'student' | 'teacher' | 'public';

export interface Announcement {
  type: AnnouncementType;
  message: string;
  active: boolean;
}

export const ANNOUNCEMENTS: Record<AnnouncementType, Announcement> = {
  student: {
    type: 'student',
    message: '',
    active: true
  },
  teacher: {
    type: 'teacher',
    message: '',
    active: true
  },
  public: {
    type: 'public',
    message: '',
    active: true
  }
};