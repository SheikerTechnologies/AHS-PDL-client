import type { ApiBlogPost } from '@/lib/blog-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getBlogs(): Promise<ApiBlogPost[]> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_URL}/blogs`, {
      next: { revalidate: 3600 },
      cache: 'no-store',
    });
  } catch {
    throw new Error('Failed to fetch blogs');
  }

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const result = await res.json();
  if (Array.isArray(result)) return result;
  if (result?.data && Array.isArray(result.data)) return result.data;
  throw new Error('Unexpected response format from blogs API');
}

export async function getBlogBySlug(slug: string): Promise<ApiBlogPost | null> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_URL}/blogs/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  if (result?.data) return result.data;
  return result ?? null;
}
