export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isHighlighted: boolean;
  originalPrice?: number;
  averageRating?: number;
  ratingCount?: number;
  imgUrl?: string;
}