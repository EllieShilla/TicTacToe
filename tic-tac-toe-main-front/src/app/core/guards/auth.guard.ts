import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../features/authorization/authorization.service';
import { RouterLinks } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRLogin();
  }

  private checkRLogin(): boolean | UrlTree {
    if(this.authService.isLoggedIn()) {
      return true;
    }
    return this.router.parseUrl(`/${RouterLinks.authorization}/${RouterLinks.signIn}`);
  }

}
