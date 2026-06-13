import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interface/product';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [MatIconModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true
})
export class ProductCard {
  @Input() product!: Product;
}
