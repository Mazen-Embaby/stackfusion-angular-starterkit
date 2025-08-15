import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginResponseData } from '../auth.service';

const signInResult: LoginResponseData = {
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzNTMwMDcxLCJleHAiOjE3NTYxMjIwNzF9.qHyRhGmykOIeO4_cK5Blow8sj147QhxTZVe4-ofQ3_0',
  user: {
    id: 1,
    email: 'admin@example.com',
    username: 'admin',
    avatar: 'assets/img/avatar/alexander-hipp-iEEBWgY_6lA-unsplash.jpg',
    blocked: false,
    provider: 'local',
    confirmed: true,
    createdAt: '2025-01-23T07:37:37.248Z',
    updatedAt: '2025-04-30T20:40:57.989Z',
  },
};
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mimic Sign in API endpoint
    if (request.url.endsWith('/auth/local') && request.method === 'POST') {
      const mockUser = signInResult;
      return of(new HttpResponse({ status: 200, body: mockUser })).pipe(delay(1000));
    }

    // Mimic User Profile API endpoint
    else if (request.url.endsWith('/users/me') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: signInResult.user })).pipe(delay(1000));
    }

    // Let other requests pass through
    return next.handle(request);
  }
}
