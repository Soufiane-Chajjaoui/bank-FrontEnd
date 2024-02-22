import {Operation} from "./AccountOperation";

export interface AccountDetails{
  accountId : string ;
  balance : number;
  currentPage : number ;
  totalPages : number ;
  pageSize : number ;
  accountOperationDTO : Operation[]
}
