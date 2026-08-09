export interface CartResponseDTO {
    cartId: string;
    items: CartItemResponseDTO[];
    subtotal: number;
    discount: number;
    total: number;
}

export interface CartItemResponseDTO {
    cartId: string;
    productId: string;
    productName: string;
    quantity: number;
    priceAtTime: number;
    total: number;
}

export interface CartItemCreateDTO {
    productId: string;
    quantity: number;
}

export interface CartItemUpdateDTO {
    quantity: number;
}
