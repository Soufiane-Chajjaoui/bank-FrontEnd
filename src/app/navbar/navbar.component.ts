import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../Models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  public user! : User ;
  constructor(public authService : AuthService , private router : Router) {
  }

  ngOnInit(): void {
    this.user = this.authService.user ;
  }

  handleLogOut(){
    this.resetUser();
    this.authService.logout();
  }

  resetUser() {
    this.user = {
      isAuthenticated: false,
      roles: '',
      accessToken: '',
      username: ''
    };
  }

}
