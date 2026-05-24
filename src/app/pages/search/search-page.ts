import { Component } from '@angular/core';
import { Product } from '../../shared/interface/product';
import { NavFilter } from "../../components/nav-filter/nav-filter";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from "../../components/cards/product-card/product-card";

@Component({
  selector: 'app-search-page',
  imports: [NavFilter, CommonModule, FormsModule, ProductCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  products: Product[] = [];

  selectedSort = 'POPULAR';

  currentPage = 1;
  pageSize = 8;

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.products.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
