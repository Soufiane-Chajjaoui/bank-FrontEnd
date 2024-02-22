import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../Models/Customer";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private UrlCustomer : string = environment.apiUrl + '/customers';
  constructor(private http : HttpClient) { }

  getCustomers() : Observable<Array<Customer>> {
    return  this.http.get<Array<Customer>>(this.UrlCustomer);
  }
  searchCustomers(keyword : string) : Observable<Array<Customer>>{
    return  this.http.get<Array<Customer>>(this.UrlCustomer+"/search?keyword="+keyword);
  }
  saveCustomer(customer : Customer) : Observable<Customer>{
    return this.http.post<Customer>(this.UrlCustomer , customer);
  }

  deleteCustomer(c: Customer) {
    return this.http.delete(this.UrlCustomer + `/${c.id}`);
  }
}
