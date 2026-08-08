import { Product } from "./product";
import { User } from "./user";

export interface Store {
    id: number;
    name: string;
    email: string;
    phone: string;
    tags: string[];
    products: Product[];
    owner: User;
}
