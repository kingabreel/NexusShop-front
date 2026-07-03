export interface Rating {
  productId: string;
  rating: number;
  comment?: string;
  anonymous?: boolean;
  imageBase64?: string
}