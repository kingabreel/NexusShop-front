import { CartProduct } from "./cartProduct";

export interface Cart {
    id?: number;
    userId: number;
    products: CartProduct[];
    totalPrice: number;
}