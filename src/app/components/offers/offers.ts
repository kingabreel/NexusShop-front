import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ProductCard } from '../cards/product-card/product-card';
import { ProductService } from '../../shared/service/product-service';
import { Product } from '../../shared/interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offers',
  imports: [ProductCard, CommonModule],
  templateUrl: './offers.html',
  styleUrl: './offers.css',
})
export class Offers implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  this.productService.getAll({ tag: 'highlight' }).subscribe(response => {
    this.products = response.data.content.map((p: any) => ({
      ...p,
      tags: [p.category],
      originalPrice: parseFloat((p.price * 1.2).toFixed(2)), 
      rating: 4.5,
      imgUrl: null
    }));

    this.cdr.detectChanges();
  });
}
}
