export type ProjectStatus = 'Ongoing' | 'Completed' | 'Upcoming';

export interface FloorPlan {
  id: string;
  title: string;
  image: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  balcony: number;
  price: number;
  status: string;
}

export interface DevelopmentProject {
  _id: string;
  id: string;
  title: string;
  slug: string;
  projectCode: string;
  status: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  location: {
    country: string;
    city: string;
    area: string;
    sector: string;
    road: string;
    address: string;
  };
  overview: {
    size: { min: number; max: number; unit: string };
    bedrooms: { min: number; max: number };
    bathrooms: { min: number; max: number };
    totalUnits: number;
    availableUnits: number;
  };
  projectInfo: {
    completionDate: string;
    developer: string;
    landArea: string;
    buildingHeight: string;
    totalFloors: number;
    parking: string;
    generator: string;
    lift: string;
    rajukApproved: boolean;
  };
  features: string[];
  floorPlans: FloorPlan[];
  pricing: {
    startingPrice: number;
    maxPrice: number;
    bookingMoney: number;
    installmentAvailable: boolean;
    installmentDuration: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type SortOption = 'newest' | 'most-available' | 'name-az';

export interface ProjectFilters {
  status: ProjectStatus[];
  areas: string[];
  types: string[];
  sizeRange: [number, number];
  sort: SortOption;
}

export interface Agent {
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  specialty: string;
}

export type ActiveTab =
  | 'Home'
  | 'Projects'
  | 'About'
  | 'Contact'
  | 'Services'
  | 'Layout'
  | 'Landowners'
  | 'Blog';

export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  remoteFriendly: boolean;
  published?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}
