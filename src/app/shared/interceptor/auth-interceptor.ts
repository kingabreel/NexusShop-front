import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../service/auth-service';
import { AuthStore } from '../store/auth.store';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const authStore = inject(AuthStore);

    const isAuthEndpoint = req.url.includes('/auth/');

    let authReq = req;
    if (!isAuthEndpoint) {
        const token = authService.getToken();
        if (token) {
            authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !isAuthEndpoint) {
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        const newToken = authService.getToken();
                        if (newToken) {
                            const clonedReq = req.clone({
                                setHeaders: { Authorization: `Bearer ${newToken}` }
                            });
                            return next(clonedReq);
                        }
                        return throwError(() => error);
                    }),
                    catchError((refreshError: HttpErrorResponse) => {
                        authStore.logout();
                        return throwError(() => error);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};
