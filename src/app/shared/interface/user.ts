import { Address } from "./address";
import { Store } from "./store";

export interface User {
    id?: number;
    email: string;
    cellphone?: string;
    password?: string;
    username: string;
    address?: Address;
    roles?: string[];
    provider?: string;
    store?: Store;
}