import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../Models/Customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  public newCustomerForm : FormGroup  | undefined;
  public isSuccess: boolean = false ;
  constructor(private serviceCustomer : CustomerService
              , private fb : FormBuilder
              , private router:Router) {}
  ngOnInit() {
    this.newCustomerForm = this.fb.group({
      name : this.fb.control( '' , [Validators.required , Validators.min(6)] ),
      email : this.fb.control("soufian" , [Validators.required , Validators.email ])
    })
  }

  newCustomer() {
    let customer : Customer = this.newCustomerForm?.value;
    this.serviceCustomer.saveCustomer(customer).subscribe(
      {
        next : value => {
          console.log(value) ;
          this.isSuccess = true ;
          this.newCustomerForm?.reset();
          this.router.navigateByUrl("/admin/customers");
        },
        error : err  => {
          console.log('Error saving customer : '+err.message);
        }
      }
    )
  }
}
