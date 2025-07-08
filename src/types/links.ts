export interface Link {
    id?: number | string;
    title: string;
    description: string;
    url: string;
    iconUrl: string;
    lexorank?: string;
  }
  
  export interface LinkCategory {
    id?: number | string;
    name: string;
    lexorank: string;
    links: Link[];
    tags?: { name: string }[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export type LinkCategories = LinkCategory[];