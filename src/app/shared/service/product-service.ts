import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Product } from '../interface/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractService<Product> {
  protected override endpoint: string = 'products';

  constructor(http: HttpClient) {
    super(http);
  }

}
