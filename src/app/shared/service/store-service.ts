import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Store } from '../interface/store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/apiResponse';

@Injectable({
    providedIn: 'root',
})
export class StoreService extends AbstractService<Store> {
    protected override endpoint: string = 'store';

    constructor(http: HttpClient) {
        super(http);
    }

    getMyStore(): Observable<ApiResponse<Store>> {
        return this.http.get<ApiResponse<Store>>(
            `${this.baseUrl}/${this.endpoint}/my-store`,
            { withCredentials: true }
        );
    }

    override create(data: Partial<Store>): Observable<Store> {
        return this.http.post<Store>(
            `${this.baseUrl}/${this.endpoint}`,
            data
        );
    }
}
