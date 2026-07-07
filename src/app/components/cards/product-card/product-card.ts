import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interface/product';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [MatIconModule, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true
})
export class ProductCard {
  @Input() product!: Product;
}
