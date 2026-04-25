import { Address } from "./address";

export interface User {
    id?: number;
    email: string;
    cellphone: string;
    password?: string;
    name: string;
    document: string;
    address: Address;
}