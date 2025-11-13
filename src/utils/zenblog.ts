import { createZenblogClient } from 'zenblog';

const BLOG_ID = 'a7487a81-fe9d-46f4-b7f1-ab96c8e5ce0c';

export const zenblog = createZenblogClient({ blogId: BLOG_ID });

export interface BlogPost {
  title: string;
  html_content: string;
  slug: string;
  excerpt?: string;
  published_at: string;
  category?: {
    name: string;
    slug: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
  authors?: Array<{
    slug: string;
    name: string;
    image_url?: string;
    website?: string;
    twitter?: string;
  }>;
}

export interface BlogPostListResponse {
  data: BlogPost[];
  total?: number;
  offset?: number;
  limit?: number;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  slug: string;
  image_url?: string;
  twitter?: string;
  website?: string;
  bio?: string;
}