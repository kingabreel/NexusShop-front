import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiResponse } from '../interface/apiResponse';

export abstract class AbstractService<T> {
    protected abstract endpoint: string;
    protected baseUrl: string = environment.apiUrl;

    constructor(protected http: HttpClient) { }

    getAll(params?: any): Observable<ApiResponse<T>> {
        return this.http.get<ApiResponse<T>>(
            `${this.baseUrl}/${this.endpoint}`,
            {
                params: this.buildParams(params),
            }
        );
    }

    getById(id: number | string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
    }

    create(data: Partial<T>): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, data);
    }

    update(id: number | string, data: Partial<T>): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, data);
    }

    patch(id: number | string, data: Partial<T>): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${this.endpoint}/${id}`, data);
    }

    delete(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
    }

    protected buildParams(params?: any): HttpParams {
        let httpParams = new HttpParams();

        if (!params) return httpParams;

        Object.keys(params).forEach((key) => {
            if (params[key] !== null && params[key] !== undefined) {
                httpParams = httpParams.set(key, params[key]);
            }
        });

        return httpParams;
    }
}