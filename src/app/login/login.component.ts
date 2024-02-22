import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  public loginForm : FormGroup | undefined;
  constructor(private formBuilder : FormBuilder , private authService : AuthService
              , private router : Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username : this.formBuilder.control(null , [Validators.required , Validators.min(4)]),
      password : this.formBuilder.control(null , [Validators.required , Validators.min(8)])
    });
  }
  auth() : void{
    const {username , password} = this.loginForm?.value ;
    console.log(this.loginForm?.value);
    this.authService.loginHttp(username , password).subscribe({
      next : value => {
        this.authService.loadProfile(value);
        console.log(value);
        this.router.navigateByUrl('/admin/customers').then(navig => console.log('/admin/customers'))
      },
      error : err => {
        console.log(err)
      }
    })
  }
}
