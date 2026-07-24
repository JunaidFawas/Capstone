export type Role = 'student' | 'landlord' | 'admin';

export interface Campus {
  id: string;
  name: string;
  city: string;
  state: string;
}

export interface Listing {
  id: string;
  landlordId: string;
  campusId: string;
  title: string;
  description: string;
  price: number;
  pricePeriod: 'year' | 'session';
  addressZone: string;
  distanceFromCampusKm: number;
  amenities: string[];
  photos: string[];
  status: 'pending' | 'live' | 'unavailable' | 'suspended';
  createdAt: string;
}

export interface ListingFilters {
  campusId?: string;
  priceMin?: number;
  priceMax?: number;
  distanceKm?: number;
  amenities?: string[];
}

export interface Review {
  id: string;
  listingId: string;
  studentId: string;
  rating: number;
  comment: string | null;
  landlordResponse: string | null;
  createdAt: string;
}

export interface InspectionRequest {
  id: string;
  listingId: string;
  studentId: string;
  landlordId: string;
  preferredDatetime: string;
  confirmedDatetime: string | null;
  status: 'pending' | 'confirmed' | 'declined' | 'completed';
  createdAt: string;
}

export interface VerificationStatus {
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason: string | null;
  verifiedAt: string | null;
}

export interface ScamReport {
  id: string;
  targetType: 'listing' | 'landlord';
  targetId: string;
  reasonCategory: string;
  note: string;
  status: 'open' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  role: Role;
}
