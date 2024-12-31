export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
    role: 'teacher' | 'student';
  }
  
  export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
  }
  
  export interface GoogleCredentialResponse {
    credential: string;
  }