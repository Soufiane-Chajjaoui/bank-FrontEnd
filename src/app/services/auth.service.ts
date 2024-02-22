import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {jwtDecode} from "jwt-decode";
import {User} from "../Models/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User = {
    isAuthenticated: false,
    roles: '',
    accessToken: '',
    username: ''
  };


  private UrlAuth : string = environment.apiUrl + '/auth';
  constructor(private http : HttpClient , private router :Router) { }

  loginHttp(username:string , password : string):Observable<any>{
    let httpParams = new HttpParams()
      .set("username" , username).set("password" , password);

    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    };
    return this.http.post<any>(this.UrlAuth + "/login" , httpParams , options);
  }

  loadProfile(data : any):void {
    this.user.isAuthenticated = true ;
    this.user.accessToken = data['access-token']
    let decodedJWT = jwtDecode(this.user.accessToken);
    if (decodedJWT.sub && decodedJWT.scope) {
      this.user.username = decodedJWT.sub;
      this.user.roles = decodedJWT.scope ;
    }
    this.setJwt(this.user.accessToken );
  }
  logout(){
    this.user.accessToken = '';
    this.user.roles = '';
    this.user.username = '' ;
    this.user.isAuthenticated = false ;
    this.removeJwt();
    this.router.navigateByUrl('login');
  }



  loadJwt() {
    let token = window.localStorage.getItem('accessToken');
    if (token){
      this.loadProfile({'access-token' : token});
    }
  }
  removeJwt() : void {
    window.localStorage.removeItem('accessToken');
  }
  setJwt(token : string) : void {
    window.localStorage.setItem('accessToken' , token );
  }
}
