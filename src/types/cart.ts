export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  priceEur: number;
  thumbnailUrl: string;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}
