import { Component } from '@angular/core';
import { Categories } from '../categories/categories';
import { Offers } from '../offers/offers';
import { MatIconModule } from '@angular/material/icon';
import { BannerSeasonSale } from '../banner-season-sale/banner-season-sale';

@Component({
  selector: 'app-main',
  imports: [Categories, Offers, MatIconModule, BannerSeasonSale],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
