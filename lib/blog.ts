import { getBlogs, getBlogBySlug } from "@/lib/api/blogs";
import type { BlogPostFrontmatter, BlogCategory, ApiBlogPost, ContentBlock } from "./blog-types";
export type { BlogPostFrontmatter, BlogCategory } from "./blog-types";
export { BLOG_CATEGORIES } from "./blog-types";

const PLACEHOLDER_IMAGE = "/images/blog-placeholder.jpg";

export interface BlogPost extends BlogPostFrontmatter {
  content: ContentBlock[];
}

let cachedPosts: BlogPost[] | null = null;

function toBlogPost(api: ApiBlogPost): BlogPost {
  return {
    title: api.title,
    slug: api.slug,
    category: api.category as BlogCategory,
    publishDate: api.publishDate,
    readTime: api.readTime || "",
    excerpt: api.excerpt || "",
    thumbnail: api.thumbnail || PLACEHOLDER_IMAGE,
    author: api.author || "",
    authorBio: api.authorBio || "",
    authorAvatar: api.authorAvatar || "",
    featured: api.featured,
    content: (api.content ?? []) as ContentBlock[],
  };
}

function sortByDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
}

async function loadAllPosts(): Promise<BlogPost[]> {
  if (cachedPosts) return cachedPosts;
  const apiPosts = await getBlogs();
  cachedPosts = apiPosts.map(toBlogPost).sort(sortByDateDesc);
  return cachedPosts;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    return await loadAllPosts();
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const all = await loadAllPosts();
    const found = all.find((p) => p.slug === slug);
    if (found) return found;
    const apiPost = await getBlogBySlug(slug);
    if (!apiPost) return null;
    return toBlogPost(apiPost);
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const all = await loadAllPosts();
    return all.map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getRelatedPosts(
  category: BlogCategory,
  excludeSlug: string,
  limit = 3
): Promise<BlogPost[]> {
  try {
    const all = await loadAllPosts();
    return all
      .filter(
        (p) =>
          p.category === category &&
          p.slug !== excludeSlug
      )
      .slice(0, limit);
  } catch {
    return [];
  }
}
