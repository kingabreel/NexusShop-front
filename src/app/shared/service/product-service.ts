import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Product } from '../interface/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractService<Product> {
  protected override endpoint: string = 'products';

  constructor(http: HttpClient) {
    super(http);
  }

  getHighlighted(page: number = 0, size: number = 10): Observable<ApiResponse<Product>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ApiResponse<Product>>(
      `${this.baseUrl}/${this.endpoint}/highlighted`,
      { params }
    );
  }
}