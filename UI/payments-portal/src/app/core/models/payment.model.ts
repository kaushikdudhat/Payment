
export interface Payment {
  id: number;
  reference: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'INR' | 'GBP';
  createdAt: string;
}
