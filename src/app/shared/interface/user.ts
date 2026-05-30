import { Address } from "./address";

export interface User {
    id?: number;
    email: string;
    cellphone?: string;
    password?: string;
    username: string;
    address?: Address;
}