import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../interface/auth';
import { AuthStore } from '../store/auth.store';
import { GoogleApi } from './google-api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected endpoint: string = "auth";
  protected baseUrl: string = environment.apiUrl;
  private authStore = inject(AuthStore);

  constructor(
    protected http: HttpClient,
    private googleApi: GoogleApi
  ) { }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<RegisterRequest>(`${this.baseUrl}/${this.endpoint}/register`, data);
  }

  login(data: LoginRequest): Observable<any> {

    return this.http.post<any>(
      `${this.baseUrl}/${this.endpoint}/login`,
      data,
      {
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.authStore.setToken(response.token);
      })
    );
  }

  refreshToken(): Observable<any> {

    return this.http.post<any>(
      `${this.baseUrl}/${this.endpoint}/refresh`,
      {},
      {
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.authStore.setToken(response.token);
      })
    );
  }

  getToken(): string | null {
    return this.authStore.accessToken();
  }

  logout() {
    this.authStore.logout();

    return this.http.post(
      `${this.baseUrl}/${this.endpoint}/logout`,
      {},
      {
        withCredentials: true
      }
    );
  }

  getGoogleProfile(): Observable<any> {
    return this.googleApi.getGoogleUser();
  }

  loginWithGoogle(token: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${this.endpoint}/google`,
      { token },
      {
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.authStore.setToken(response.token);
      })
    );
  }
}
