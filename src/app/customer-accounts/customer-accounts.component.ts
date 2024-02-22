import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../Models/Customer";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements  OnInit{

  public customer! : Customer
  public id! : number ;

    constructor(private activeRoute : ActivatedRoute , private router : Router) {
      this.customer = this.router.getCurrentNavigation()?.extras.state as Customer ;
    }
    ngOnInit() {
      this.id = this.activeRoute.snapshot.params['id'];

    }
}
