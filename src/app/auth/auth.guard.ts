import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  NavigationExtras,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): true | UrlTree {
    const url = `${route.path}`;
    return this.checkLogin(url);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): true | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.authService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = 12345678;

    // Set navigation extras object
    // contains global query params and segment
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor',
    };

    // return this.router.parseUrl('/login');
    return this.router.createUrlTree(['/login'], navigationExtras);
  }
}
