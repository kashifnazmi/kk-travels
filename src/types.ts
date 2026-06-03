export type PackageCategory = 'Domestic' | 'International' | 'Family' | 'Honeymoon' | 'Adventure' | 'Religious';

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: PackageCategory;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  originalPrice?: number;
  featured: boolean;
  tags: string[];
  description: string;
  itinerary: string[];
  highlights: string[];
}

export interface TravelService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  category: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking' | 'Payment' | 'Documents';
}

export interface BookingInquiry {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  destinationId: string;
  travelDate: string;
  durationDays: number;
  guestsCount: number;
  packageType: PackageCategory;
  specialRequests?: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Confirmed';
}
