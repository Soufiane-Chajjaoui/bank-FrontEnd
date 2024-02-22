import {BankAccount} from "./BankAccount";

export interface Operation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  bankAccount:   BankAccount;
  description:   string;
}
