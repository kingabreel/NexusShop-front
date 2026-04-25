import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interface/order';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends AbstractService<Order> {
  protected override endpoint: string = 'order';

  constructor(http: HttpClient) {
    super(http);
  }
}
