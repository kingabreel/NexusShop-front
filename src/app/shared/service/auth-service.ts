import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../interface/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected endpoint: string = "auth";
  protected baseUrl: string = environment.apiUrl;

  constructor(protected http: HttpClient) { }

  login(data: LoginRequest): Observable<any> {
    return this.http.post<LoginRequest>(`${this.baseUrl}/${this.endpoint}/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<RegisterRequest>(`${this.baseUrl}/${this.endpoint}/register`, data);
  }

}
