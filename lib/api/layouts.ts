import type { Layout } from '@/lib/layouts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getLayouts(): Promise<Layout[]> {
  const res = await fetch(`${API_URL}/layouts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error('Failed to fetch layouts');
  }

  const result = await res.json();
  if (Array.isArray(result)) return result;
  if (result?.data && Array.isArray(result.data)) return result.data;
  throw new Error('Unexpected response format from layouts API');
}

export async function getLayoutById(id: string): Promise<Layout | null> {
  const res = await fetch(`${API_URL}/layouts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  if (result?.data) return result.data;
  return result ?? null;
}
