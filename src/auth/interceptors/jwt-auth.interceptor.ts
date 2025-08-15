import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { EXCLUDE_API_BEARER } from '../api.filter';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  private _authService = inject(AuthService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url

    let newReq = request.clone();

    const user = this._authService.getUser();
    const token = this._authService.getTokenIfValid();
    const isLoggedInAndValidToken = user && token;

    const isApiUrl = request.url.startsWith(environment.backendAPIUrl) && !EXCLUDE_API_BEARER.includes(request.url);

    if (isLoggedInAndValidToken && isApiUrl) {
      newReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        // "401 Unauthorized"
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          this._authService.logout();

          // Reload the app
          location.reload();
        }

        return throwError(() => error);
      }),
    );
  }
}
