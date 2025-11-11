export interface Reference {
  clientName: string;
  projectName: string;
}

export type LogisticsFilter = 'all' | 'included' | 'excluded';
export type PaymentTermFilter = 'all' | 'term' | 'cash';

export interface SupplyRequestItem {
  id: number;
  image: string;
  title: string;
  timeAgo: string;
  createdAt: Date;
  description: string;
  priceMin?: number; // Represents minimum offer value
  priceMax?: number; // Represents total budget
  offerCount: number;
  allowOffersOutsideRange: boolean;
  ownerId: number | string;
  requiresPhotoInOffers: boolean;
  // B2B specific fields
  quantity?: number;
  minOrderQuantity?: number; // Minimum order quantity
  unit?: 'adet' | 'kg' | 'ton' | 'koli' | 'palet';
  deliveryDeadline?: Date;
  isDeadlineFlexible?: boolean;
  certificationsRequired?: string;
  logisticsIncluded?: boolean;
  hasPaymentTerm?: boolean; // vadeli mi vadesiz mi
  isReturnable?: boolean; // iadeli mi iadesiz mi
  // TAM Assistant Bot fields
  assistantManaged?: boolean;
  assistantStatus?: 'searching' | 'collecting' | 'analyzing' | 'recommendation_ready' | 'complete';
}

export interface CorporateUser {
  id: number | string;
  companyName: string;
  logo: string;
  registrationDate: string;
  industry: string;
  isVerified: boolean;
  rating?: number;
  reviewCount?: number;
  references?: Reference[];
  // Legal entity fields
  entityType: 'legal' | 'sole'; // legal: Tüzel Kişilik, sole: Şahıs Şirketi
  taxId: string;
}

export interface Offer {
  id: number;
  requestId: number;
  sellerId: number | string;
  amount: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  image?: string;
  isRated?: boolean;
}

// The offer object passed here is enriched with nested request and seller info
export interface EnrichedOffer extends Offer {
    request: SupplyRequestItem;
    seller: CorporateUser;
    isMyOffer: boolean;
}