import type { DevelopmentProject } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getProjects(limit?: number): Promise<DevelopmentProject[]> {
  const url = limit ? `${API_URL}/projects?limit=${limit}` : `${API_URL}/projects`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  return res.json();
}

export async function getProjectBySlug(slug: string): Promise<DevelopmentProject | null> {
  const res = await fetch(`${API_URL}/projects/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
