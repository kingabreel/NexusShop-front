import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interface/product';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../shared/service/cart-service';
import { CartItemCreateDTO } from '../../../shared/interface/cart';

@Component({
  selector: 'app-product-card',
  imports: [MatIconModule, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true
})
export class ProductCard {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    const cartItem: CartItemCreateDTO = {
      productId: this.product.id,
      quantity: 1
    };

    this.cartService.create(cartItem).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
      },
      error: (error) => {
        console.error('Failed to add product to cart:', error);
      }
    });
  }
}
