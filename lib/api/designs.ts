const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiDesign {
  _id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getDesigns(): Promise<ApiDesign[]> {
  const res = await fetch(`${API_URL}/designs`, {
    next: { revalidate: 60 },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error('Failed to fetch designs');
  }

  const result = await res.json();
  if (Array.isArray(result)) return result;
  if (result?.data && Array.isArray(result.data)) return result.data;
  throw new Error('Unexpected response format from designs API');
}

export async function getDesignById(id: string): Promise<ApiDesign | null> {
  const res = await fetch(`${API_URL}/designs/${id}`, {
    next: { revalidate: 60 },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  if (result?.data) return result.data;
  return result ?? null;
}
