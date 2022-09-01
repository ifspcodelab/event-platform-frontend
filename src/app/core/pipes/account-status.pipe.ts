import { Pipe, PipeTransform } from '@angular/core';
import {AccountRole} from "../models/account-role.model";
import {AccountStatus} from "../models/account-status.model";

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {

  transform(value: AccountStatus): string {
    return AccountStatus[value];
  }

}
