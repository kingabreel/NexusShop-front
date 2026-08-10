import { Product } from './product';

export interface Promotion {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  percentage: number;
  active: boolean;
  products?: Product[];
}