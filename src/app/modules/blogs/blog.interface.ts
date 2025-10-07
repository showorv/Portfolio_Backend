export interface IBlog {
    title: string;
    slug: string
    thumbnail?: string;
    content: string;
    tags: string[];
    category?: string;
    isPublished: boolean;
    publishedAt?: Date;
    views?: number
   
  }