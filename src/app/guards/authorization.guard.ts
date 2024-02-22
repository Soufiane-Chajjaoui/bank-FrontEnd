import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authorizationGuard: CanActivateFn = (route, state) => {

  if (inject(AuthService).user.roles.includes("ADMIN")) {
    return true;
  }else {
    inject(Router).navigateByUrl('/admin/notAuthorized') ;
    return false;
  }

};
