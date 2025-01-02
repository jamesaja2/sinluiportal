export interface UserInfo {
    name: string;
    email: string;
    picture: string;
    role: 'student' | 'teacher' | null;
  }
  
  export interface AuthContextType {
    user: UserInfo | null;
    login: () => void;
    logout: () => void;
  }