export type PropertyType = 'Apartment' | 'Villa' | 'Independent House' | 'Plot';
export type ListingIntent = 'buy' | 'rent';
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';

export interface PropertyLocation {
  city: 'Nagpur' | 'Pune' | 'Mumbai' | 'Bengaluru';
  locality: string;
  address: string;
  pincode: string;
  nearbyTransit: string;
  transitDistanceKm: number;
  nearbySchool: string;
  schoolDistanceKm: number;
  nearbyHub: string;
  hubDistanceKm: number;
  nearbyPark: string;
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  intent: ListingIntent;
  type: PropertyType;
  price: number; // in INR
  pricePerSqFt?: number;
  maintenanceMonthly?: number;
  deposit?: number; // For rental
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  carpetAreaSqFt: number;
  superBuiltupAreaSqFt: number;
  furnishing: FurnishingStatus;
  facing: 'North' | 'East' | 'North-East' | 'West' | 'South';
  floorNumber?: number;
  totalFloors?: number;
  possessionYear: number | string;
  reraId?: string;
  isReraRegistered: boolean;
  location: PropertyLocation;
  amenities: string[];
  images: string[];
  description: string;
  highlights: string[];
  isFeatured?: boolean;
}

export interface FilterState {
  searchQuery: string;
  city: string;
  intent: ListingIntent | 'all';
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  minArea: number;
  maxArea: number;
  furnishing: string;
  amenities: string[];
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface MatchPreferences {
  city: 'Nagpur' | 'Pune' | 'Mumbai' | 'Bengaluru' | '';
  localityPreference: string;
  intent: ListingIntent;
  maxBudget: number;
  propertyType: PropertyType | 'Any';
  preferredBedrooms: number;
  furnishing: string;
  mustHaveAmenities: string[];
  lifestylePriorities: {
    transitProximity: boolean; // under 2.5km
    schoolProximity: boolean;  // under 3km
    workHubProximity: boolean; // under 5km
    greeneryAndParks: boolean;
    familyFriendly: boolean;
  };
}

export interface MatchScoreResult {
  property: Property;
  score: number; // 0 - 100
  reasons: string[];
  compromises: string[];
  isAlternative?: boolean;
}

export interface EMIResult {
  loanAmount: number;
  downPayment: number;
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
  stampDuty: number;
  registrationFee: number;
  gstAmount: number;
  interiorCost: number;
  totalAcquisitionCost: number;
}

export interface DueDiligenceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  verificationGuide: string;
  completed: boolean;
  notes?: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyTitle: string;
  buyerType: 'First-time Buyer' | 'Investor' | 'Tenant' | 'Family Upgrade';
  scheduledVisitDate?: string;
  message: string;
}
