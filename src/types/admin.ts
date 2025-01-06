import { LinkCategories } from './links';

export interface AdminResponse {
  success: boolean;
  message?: string;
  data?: LinkCategories;
}

export interface AdminState {
  isEditing: boolean;
  selectedCategory: number | null;
  selectedLink: number | null;
  isAddingCategory: boolean;
  isAddingLink: boolean;
}