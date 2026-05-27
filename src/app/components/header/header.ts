import { Component, inject } from '@angular/core';
import { AuthStore } from '../../shared/store/auth.store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authStore = inject(AuthStore);
}
