
export type Language = 'en' | 'am' | 'zh' | 'ar' | 'fr';

export interface ContentData {
  navHome: string;
  navAbout: string;
  navRooms: string;
  navDining: string;
  navSpa: string;
  navFitness: string;
  heroTitle: string;
  heroSub: string;
  exploreBtn: string;
  facilitiesTitle: string;
  gymDesc: string;
  spaDesc: string;
  poolDesc: string;
  membershipTitle: string;
  standardPlan: string;
  premiumPlan: string;
  elitePlan: string;
  contactTitle: string;
  footerRights: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  plan: string;
  message: string;
  date: string;
  status: 'pending' | 'responded' | 'archived';
}

export interface Reservation {
  id: string;
  guestName: string;
  guestId: string; // Passport or National ID
  email: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  roomNumber: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
}

export interface DiningOrder {
  id: string;
  category: 'Food' | 'Drink';
  item: string;
  price: number;
  roomNumber: string;
  timestamp: string;
}

export interface GymMembership {
  id: string;
  name: string;
  plan: 'Standard' | 'Executive' | 'Elite';
  status: 'Active' | 'Expired';
  expiryDate: string;
}

export interface Stats {
  visits: number;
  members: number;
  revenue: number;
  growth: number;
  activeBookings: number;
  foodSales: number;
  drinkSales: number;
}
