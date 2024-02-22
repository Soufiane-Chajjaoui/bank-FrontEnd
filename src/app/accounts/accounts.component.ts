import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccountService} from "../services/bank-account.service";
import {AccountDetails} from "../Models/AccountDetails";
import {patternAmount} from "../validators/patterns";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

  public searchForm : FormGroup | undefined;
  public operationForm : FormGroup | undefined ;
  public currentPage : number = 0;
  public sizePage : number = 5;
  public navigationTabs : Array<any> = [
    {tab: 0 , nav : "Debit" },
    {tab: 1 , nav: "Credit"} ,
    {tab : 2 , nav: "Transfer"}
  ];
  public currentTab : any ;
  public errorMessage! : string ;
  public accountDetails : AccountDetails | undefined;



  constructor(private bankAccountService : BankAccountService
              , private formBuilder : FormBuilder , public authService : AuthService) {
  }
  ngOnInit() {
    this.operationForm = this.formBuilder.group({
      accountID : this.formBuilder.control(this.accountDetails?.accountId , [Validators.required , Validators.pattern("^[0-9]*$")]),
      amount : this.formBuilder.control(null , [Validators.required , Validators.pattern("^[0-9]*$") ]),
      type : this.formBuilder.control(null , [Validators.required ]),
      destination : this.formBuilder.control(null ),
      description : this.formBuilder.control(null , [Validators.required ])
    })
    this.searchForm = this.formBuilder.group({
      idAccount : this.formBuilder.control("" , [Validators.required])
    })
    this.navigateToTab(this.navigationTabs[0]);
  }

  handleSearchAccount() {
    let idAccount = this.searchForm?.value.idAccount;
    console.log(idAccount);
    this.bankAccountService.Accountdetails(idAccount , this.currentPage , this.sizePage).subscribe({
      next : value => {
        this.operationForm!.get('accountID')!.setValue(idAccount);
        this.accountDetails=value;
      },
      error : err => console.log(err)
    });
  }

  navigateToTab(tab : any) : void{
    this.currentTab = tab ;
    this.operationForm!.get('type')!.setValue(tab.nav) ;
  }

  gotoPage(index : number) {
    this.currentPage = index ;
    this.handleSearchAccount();
  }

  saveOperation() : any{
    let {accountID , amount , type , destination , description} = this.operationForm?.value;
    switch (this.currentTab.nav){
      case this.navigationTabs[2].nav :
        return this.bankAccountService.saveTransfer(accountID , amount , destination , description)
                  .subscribe({
                    next : value => this.handleSearchAccount() ,
                    error : err => console.log(err)
                  },)
      case this.navigationTabs[1].nav :
        return this.bankAccountService.saveCredit(accountID , amount , description)
          .subscribe({
            next : value => this.handleSearchAccount() ,
            error : err => console.log(err)
          });
      case this.navigationTabs[0].nav :
        return this.bankAccountService.saveDebit(accountID , amount , description)
          .subscribe({
            next : value => this.handleSearchAccount(),
            error : err => console.log(err)
          });
    }
  }
}
