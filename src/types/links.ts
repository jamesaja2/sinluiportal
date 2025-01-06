export interface Link {
    id?: number;
    title: string;
    description: string;
    url: string;
    iconUrl: string;
  }
  
  export interface LinkCategory {
    id?: number;
    name: string;
    lexorank: string;
    links: Link[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export type LinkCategories = LinkCategory[];