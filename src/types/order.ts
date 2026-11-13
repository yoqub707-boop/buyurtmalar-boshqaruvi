export type OrderStatus = 'Yangi' | 'Tayyor';

export interface Order {
  id: number;
  customer: string;
  description: string;
  deliveryDate: string; // ISO format "YYYY-MM-DD" or standard date string
  status: OrderStatus;
  createdAt?: string;
  price?: number;
  phone?: string;
}

export type OrderFilter = 'Barchasi' | 'Yangi' | 'Tayyor';
