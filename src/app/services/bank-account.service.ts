import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankAccount} from "../Models/BankAccount";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../Models/AccountDetails";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private UrlBankAccount : string = environment.apiUrl + '/BankAccounts';

  constructor(private http : HttpClient) { }

  public Accountdetails(id : number , page : number , size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.UrlBankAccount + `/AccountHistory?id=${id}&page=${page}&size=${size}`);
  }
  public saveDebit(accountID : number , amount:number , description : string) : Observable<any> {
    console.log(accountID)
    return this.http.post(this.UrlBankAccount + '/OperationDebit' , {accountID , amount , description })
  }
  public saveCredit(accountID : number , amount:number , description : string) : Observable<any> {
    return this.http.post(this.UrlBankAccount + '/OperationCredit' , {accountID , amount , description })
  }
  public saveTransfer(accountID : number , amount:number , destination : number , description : string) : Observable<any> {
    return this.http.post(this.UrlBankAccount + '/OperationTransfer' , {accountID , amount , destination, description })
  }
}
