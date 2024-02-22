import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { LoginComponent } from './login/login.component';
import {NgOptimizedImage} from "@angular/common";
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {InterceptorHttpInterceptor} from "./interceptors/interceptor-http.interceptor";
import {AuthService} from "./services/auth.service";
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

export const injetionAuthByToken = new InjectionToken<string>('');
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    CustomerAccountsComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
  providers: [{provide : HTTP_INTERCEPTORS , useClass: InterceptorHttpInterceptor , multi : true} ,],
  bootstrap: [AppComponent]
})
export class AppModule { }
