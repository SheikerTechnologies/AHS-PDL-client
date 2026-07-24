interface InquiryInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface InquiryResponse {
  success: boolean;
  insertedId?: string;
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function createInquiry(data: InquiryInput): Promise<InquiryResponse> {
  const res = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: InquiryResponse = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to submit inquiry');
  }

  return result;
}
