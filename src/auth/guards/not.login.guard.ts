import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotLoginGuard implements CanActivate {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    if (this._authService.getTokenIfValid()) {
      return false; // Prevent access if the user is already logged in
    }
    return true; // Allow access if the user is not logged in
  }
}
