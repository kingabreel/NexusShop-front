import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../shared/service/cart-service';
import { CartResponseDTO, CartItemResponseDTO, CartItemCreateDTO, CartItemUpdateDTO } from '../../shared/interface/cart';

@Component({
    selector: 'app-cart',
    imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatProgressSpinnerModule, DecimalPipe],
    templateUrl: './cart.html',
    styleUrl: './cart.css',
})
export class Cart implements OnInit {
    cart: CartResponseDTO | null = null;
    loading = false;
    errorMessage: string | null = null;

    constructor(
        private cartService: CartService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart(): void {
        this.loading = true;
        this.errorMessage = null;

        this.cartService.getCart().subscribe({
            next: (resp) => {
                this.cart = resp.data as any as CartResponseDTO;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to load cart:', error);
                this.loading = false;
                this.errorMessage = 'Failed to load cart. Please try again.';
                this.cdr.detectChanges();
            }
        });
    }

    updateQuantity(item: CartItemResponseDTO, newQuantity: number): void {
        if (newQuantity < 1) return;

        const dto: CartItemUpdateDTO = { quantity: newQuantity };
        this.cartService.update(item.productId, dto).subscribe({
            next: () => {
                this.loadCart();
            },
            error: (error) => {
                console.error('Failed to update item:', error);
                this.errorMessage = 'Failed to update item. Please try again.';
                this.cdr.detectChanges();
            }
        });
    }

    removeItem(item: CartItemResponseDTO): void {
        // this.cartService.deleteCartItem(item.productId).subscribe({
        //     next: () => {
        //         this.loadCart();
        //     },
        //     error: (error) => {
        //         console.error('Failed to remove item:', error);
        //         this.errorMessage = 'Failed to remove item. Please try again.';
        //         this.cdr.detectChanges();
        //     }
        // });
    }

    clearCart(): void {
        this.cartService.delete(this.cart?.cartId ?? '').subscribe({
            next: () => {
                this.cart = null;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Failed to clear cart:', error);
                this.errorMessage = 'Failed to clear cart. Please try again.';
                this.cdr.detectChanges();
            }
        });
    }
}
