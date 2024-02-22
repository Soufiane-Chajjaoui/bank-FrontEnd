import { Component, OnInit } from '@angular/core';
import {Customer} from '../Models/Customer' ;
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import { Router} from "@angular/router";
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  public customers! : Observable<Array<Customer>> ;
  public errorMessage! : string;
  public searchformGroup : FormGroup | undefined ;
  constructor(private router : Router ,private customerService : CustomerService , private fb : FormBuilder){
    console.log("init")
  }

  ngOnInit(): void {
    this.searchformGroup = this.fb.group({
      keyword : this.fb.control("")
    })
      this.customers = this.customerService.getCustomers()
        .pipe(catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        }));
  }

  handleSearchCustomer() {
      let kw = this.searchformGroup?.value.keyword;
      this.customers = this.customerService.searchCustomers(kw);
  }

  handleDeleteCustomer(c: Customer) {
    this.customerService.deleteCustomer(c).subscribe({
      next : value => {
        this.customers = this.customers.pipe(
          map(customersfilter=>{
            let index : number = customersfilter.indexOf(c); // indexOf(object) qui retourne replacment de element dans un tableau
            customersfilter.slice(index , 1); // eleminer un customer du l'index
            return customersfilter;
          })
        )
      },
      error : err => {
        console.log(err.message);
      }
    });
  }

  navigateToAccounts(c: Customer) {
    this.router.navigateByUrl('/customer-accounts/'+c.id , {state : c})
      .then(value => console.log('navigate To Accounts ' + c.name));
  }
}
