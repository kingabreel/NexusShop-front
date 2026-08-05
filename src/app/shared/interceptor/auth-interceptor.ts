import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
    catchError,
    retry,
    switchMap,
    throwError
} from 'rxjs';

import { AuthService } from '../service/auth-service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next(req).pipe(
        retry({
            count: 5, 
            delay: (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return authService.refreshToken().pipe(
                        switchMap(() => {
                            const newToken = authService.getToken();
                            req = req.clone({
                                setHeaders: { Authorization: `Bearer ${newToken}` }
                            });
                            return next(req);
                        })
                    );
                }
                
                return throwError(() => error);
            }
        })
    );
};