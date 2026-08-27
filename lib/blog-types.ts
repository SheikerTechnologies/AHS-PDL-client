/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BlogCategory =
  | "Company news"
  | "Property guides"
  | "Market trends"
  | "Events"
  | "Marketing";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Company news",
  "Property guides",
  "Market trends",
  "Events",
  "Marketing",
];

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  category: BlogCategory;
  publishDate: string;
  readTime: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  featured: boolean;
}

export interface ContentBlock {
  type: string;
  text?: string;
  url?: string;
}

export interface ApiBlogAuthor {
  name: string;
  avatar?: string;
  designation?: string;
}

export interface ApiBlogThumbnail {
  url: string;
  alt?: string;
}

export interface ApiBlogPost {
  _id: string;
  title: string;
  slug: string;

  thumbnail: ApiBlogThumbnail | string;

  author: ApiBlogAuthor | string;

  authorBio?: string;
  authorAvatar?: string;

  excerpt: string;
  category: string;
  readTime?: string;
  featured: boolean;
  status: string;
  publishDate: string;

  content: ContentBlock[];

  seo?: Record<string, unknown>;

  views: number;

  createdAt?: string;
  updatedAt?: string;

  tags?: string[];
}