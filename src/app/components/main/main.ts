import { Component } from '@angular/core';
import { Categories } from '../categories/categories';
import { Offers } from '../offers/offers';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  imports: [Categories, Offers, MatIconModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
