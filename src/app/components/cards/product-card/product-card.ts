import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interface/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true
})
export class ProductCard {
  @Input() product!: Product;
}
