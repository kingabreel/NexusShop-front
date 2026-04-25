import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Cart } from '../interface/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService extends AbstractService<Cart> {
  protected override endpoint: string = 'cart';

  constructor(http: HttpClient) {
    super(http);
  }

}
