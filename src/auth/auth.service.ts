import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { AUTH_API } from './auth.api';
import { User } from './models/user.model';
import { jwtDecode } from 'jwt-decode';

export interface LoginResponseData {
  jwt: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenExpirationTimer: any;

  user$ = new ReplaySubject<User | null>(1);
  jwt$ = new ReplaySubject<string | null>(1);

  getTokenIfValid() {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      return null;
    }
    const authData: LoginResponseData = JSON.parse(auth);

    const jwdDecode = this.getDecodedAccessToken(authData.jwt);
    /*
    exp and iat claim values must be NumericDate values defined as the number of seconds (not milliseconds)
    */
    const exp_ms = jwdDecode.exp * 1000; // convert to ms

    if (exp_ms < Date.now()) {
      // re-route to auth
      this.logout();
      return null;
    }

    return authData.jwt;
  }

  getUser() {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      return null;
    }
    const authData: LoginResponseData = JSON.parse(auth);
    return authData.user;
  }

  setUser(user: User) {
    this.user$.next(user);
  }

  setToken(jwt: string) {
    this.jwt$.next(jwt);
  }

  signin(identifier: string, password: string) {
    return this.http
      .post<LoginResponseData>(`${AUTH_API.SIGN_IN_END_POINT}`, {
        identifier,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData, false);
        }),
      );
  }

  signInWithProvider(params: any) {
    return this.http
      .get<LoginResponseData>(`${AUTH_API.GOOGLE_SIGN_IN_END_POINT}`, {
        params,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData, false);
        }),
      );
  }

  me() {
    return this.http.get<User>(`${AUTH_API.ME_END_POINT}`).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.updateUser(resData);
      }),
    );
  }

  updateUser(userData: User) {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      return;
    }
    const authData: LoginResponseData = JSON.parse(auth);

    this.user$.next(userData);

    authData.user = userData;

    localStorage.setItem('auth', JSON.stringify(authData));
  }

  /**
   * Register password
   *
   * @param username
   * @param email
   * @param password
   */
  register(username: string, email: string, password: string) {
    return this.http
      .post<LoginResponseData>(`${AUTH_API.REGISTER_END_POINT}`, {
        username,
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData, false);
        }),
      );
  }

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${AUTH_API.RESET_PASS_END_POINT}`, email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this.http.post(`${AUTH_API.RESET_PASS_END_POINT}`, password);
  }

  autoLogin() {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      return;
    }
    const authData: LoginResponseData = JSON.parse(auth);
    this.handleAuthentication(authData, true);
  }

  logout() {
    localStorage.removeItem('auth');
    this.user$.next(null);
    this.jwt$.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * Auto Logout
   *
   * @param expirationDurationMs expiration time in milliseconds
   */
  autoLogout(expirationDurationMs: number) {
    if (expirationDurationMs > 0 && expirationDurationMs < 600000) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDurationMs);
    }
  }

  private handleAuthentication(loginResponseData: LoginResponseData, isAutoLogin: boolean) {
    this.user$.next(loginResponseData.user);
    this.jwt$.next(loginResponseData.jwt);

    const jwdDecode = this.getDecodedAccessToken(loginResponseData.jwt);

    const iat_ms = jwdDecode.iat * 1000;
    const exp_ms = jwdDecode.exp * 1000;

    this.autoLogout(exp_ms - Date.now());

    if (!isAutoLogin) {
      localStorage.setItem('auth', JSON.stringify(loginResponseData));
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error.message) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'Invalid identifier or password':
        errorMessage = 'There is no Email//Password match our records';
        break;

      default:
        errorMessage = errorRes.error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
