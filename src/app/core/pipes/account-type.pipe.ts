import { Pipe, PipeTransform } from '@angular/core';
import { AccountType } from "../models/account-type.model";

@Pipe({
  name: 'accountType'
})
export class AccountTypePipe implements PipeTransform {

  transform(value: AccountType): string {
    return AccountType[value];
  }
}
