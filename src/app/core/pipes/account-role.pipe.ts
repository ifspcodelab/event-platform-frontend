import { Pipe, PipeTransform } from '@angular/core';
import {AccountRole} from "../models/account-role.model";

@Pipe({
  name: 'accountRole'
})
export class AccountRolePipe implements PipeTransform {

  transform(value: AccountRole): string {
    return AccountRole[value];
  }

}
