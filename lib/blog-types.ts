/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BlogCategory =
  | "Company news"
  | "Property guides"
  | "Market trends"
  | "Events";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Company news",
  "Property guides",
  "Market trends",
  "Events",
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

export interface ApiBlogPost {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  excerpt: string;
  category: string;
  readTime: string;
  featured: boolean;
  status: string;
  publishDate: string;
  content: unknown[];
  seo: Record<string, unknown>;
  views: number;
}
