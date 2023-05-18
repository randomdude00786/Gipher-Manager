import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';
import { RouterService } from './service/router.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authenticationservice: AuthenticationService, private routerservice: RouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const result = this.authenticationservice.isUserAuthenticated(this.authenticationservice.getBearerToken());
    return result.then((authenticated) => {
      if (!authenticated) {
        this.routerservice.routeToLogin();
      }
      return authenticated;
    });
  }
}
