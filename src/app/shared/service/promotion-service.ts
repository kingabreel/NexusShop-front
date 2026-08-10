import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { Promotion } from '../interface/promotion';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/apiResponse';

@Injectable({ providedIn: 'root' })
export class PromotionService extends AbstractService<Promotion> {
  protected override endpoint: string = 'promotions';

  constructor(http: HttpClient) {
    super(http);
  }

  getActive(): Observable<ApiResponse<Promotion>> {
    return this.http.get<ApiResponse<Promotion>>(`${this.baseUrl}/${this.endpoint}/active`);
  }
}
