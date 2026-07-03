import { Component } from '@angular/core';
import { Categories } from '../categories/categories';
import { Offers } from '../offers/offers';
import { MatIconModule } from '@angular/material/icon';
import { BannerSeasonSale } from '../banner-season-sale/banner-season-sale';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-main',
  imports: [Categories, Offers, MatIconModule, BannerSeasonSale, Footer],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
