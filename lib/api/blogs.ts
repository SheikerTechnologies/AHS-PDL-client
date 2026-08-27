import type { ApiBlogPost } from '@/lib/blog-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getBlogs(): Promise<ApiBlogPost[]> {
  const res = await fetch(`${API_URL}/blogs`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const result = await res.json();
  if (Array.isArray(result)) return result;
  if (result?.data && Array.isArray(result.data)) return result.data;
  throw new Error('Unexpected response format from blogs API');
}

export async function getBlogBySlug(slug: string): Promise<ApiBlogPost | null> {
  const res = await fetch(`${API_URL}/blogs/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  if (result?.data) return result.data;
  return result ?? null;
}
