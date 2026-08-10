export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountedPrice?: number;
  stock: number;
  category: string;
  isHighlighted: boolean;
  averageRating?: number;
  ratingCount?: number;
  imgUrl?: string;
}