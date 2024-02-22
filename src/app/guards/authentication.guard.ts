import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).user.isAuthenticated ? true : inject(Router).createUrlTree(['/login']);
};
