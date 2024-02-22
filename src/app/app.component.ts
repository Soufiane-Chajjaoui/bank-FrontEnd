import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bank-FrontEnd';

  constructor(private authService : AuthService , private router :Router) {
  }
  ngOnInit(): void {
    this.authService.loadJwt() ;
    this.router.navigateByUrl('/admin/customers') ;
  }

}
