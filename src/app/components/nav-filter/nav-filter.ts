import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-nav-filter',
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './nav-filter.html',
  styleUrl: './nav-filter.css',
})
export class NavFilter {
  protected readonly categories = [
    'ELETRONICOS',
    'ROUPAS',
    'ALIMENTOS',
    'MOVEIS',
    'ACESSORIOS',
    'ELETRODOMESTICOS'
  ]
  protected readonly tags = [
    'PROMOÇÃO',
    'NOVO',
    'USADO',
    'OFERTA',
    'EXCLUSIVO',
    'LIMITADO'
  ]
  minValue = 30;
  maxValue = 1500;

}
