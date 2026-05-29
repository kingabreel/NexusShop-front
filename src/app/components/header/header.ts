import { Component, inject } from '@angular/core';
import { AuthStore } from '../../shared/store/auth.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../shared/service/search-event-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authStore = inject(AuthStore);

  searchText: string = '';

  constructor(private router: Router, private eventService: EventService) { }

  search() {
    if (window.location.origin + '/search' !== window.location.href) {
      localStorage.setItem('searchQuery', this.searchText);
      this.router.navigate(['/search']);
    } else {
      this.searchProduct(this.searchText);
    }
  }

  searchProduct(query: string) {
    this.eventService.emitSearch(query);
  }
}
