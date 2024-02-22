import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn : 'root'
})
export class InterceptorHttpInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes("login")) return next.handle(request) ;
    let newRequest = request.clone({headers :request.headers.set('Authorization' , 'Bearer ' + this.authService.user.accessToken)});
    console.log(newRequest);
    return next.handle(newRequest).pipe(
      catchError(err => {
        this.authService.logout();
        return throwError(err);
      })
    );
  }
}
