import { Pipe, PipeTransform } from '@angular/core';
import { UsersRole } from "../models/users-role.model";

@Pipe({
  name: 'usersRole'
})
export class UsersRolePipe implements PipeTransform {

  transform(value: any): string {
    return UsersRole[value];
  }

}
