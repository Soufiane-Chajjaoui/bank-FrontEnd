import {Customer} from "./Customer";
import {Operation} from "./AccountOperation";

export interface BankAccount {
  id:            number;
  balance:       number;
  accountStatus: string;
  customer:      Customer;
  accountOperationDTO:   Operation[];
  type:          string;
  createAt:      Date;
  delete:        boolean;
}
