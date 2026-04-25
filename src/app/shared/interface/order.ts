import { CartProduct } from "./cartProduct";
import { User } from "./user";

export interface Order {
    id?: number;
    user: User;
    products: CartProduct[];
    totalPrice: number;
    date: Date;
    status: string;
}