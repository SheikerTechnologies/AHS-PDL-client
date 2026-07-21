export interface InteriorDesign {
  id: string;
  title: string;
  description: string;
  images: string[];
}

interface ApiDesign {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

export function toInteriorDesign(raw: ApiDesign): InteriorDesign {
  return {
    id: raw._id,
    title: raw.title,
    description: raw.description,
    images: raw.images || [],
  };
}
