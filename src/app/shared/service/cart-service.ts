import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { CartItemCreateDTO, CartResponseDTO } from '../interface/cart';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interface/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class CartService extends AbstractService<CartItemCreateDTO> {
  protected override endpoint: string = 'cart';

  constructor(http: HttpClient) {
    super(http);
  }

  override create(dto: CartItemCreateDTO) {
    return this.http.post<CartItemCreateDTO>(`${this.baseUrl}/${this.endpoint}/items`, dto);
  }

  getCart(){
    return this.http.get<ApiResponse<CartResponseDTO>>(`${this.baseUrl}/${this.endpoint}`);
  }
}
