export type TagType = 'public' | 'student' | 'staff';

export interface Tag {
  name: TagType;
}

export const AVAILABLE_TAGS: TagType[] = ['public', 'student', 'staff'];