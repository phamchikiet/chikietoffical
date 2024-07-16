import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UsersService } from '../users.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _UsersService: UsersService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const redirectUrl = state.url === '/logout' ? '/' : state.url;
    return this._check(redirectUrl);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const redirectUrl = state.url === '/logout' ? '/' : state.url;
    return this._check(redirectUrl);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._check('/');
  }
  private _check(redirectURL: string): Observable<boolean> {
    return this._UsersService.checkDangnhap().pipe(
      switchMap((authenticated) => {
        if (!authenticated) {
          this._router.navigate(['/login'], { queryParams: { redirectURL } });
          return of(false);
        }
        return of(true);
      })
    );
  }
}
