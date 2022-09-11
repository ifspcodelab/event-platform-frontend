import { Pipe, PipeTransform } from '@angular/core';
import { RegistrationStatus } from "../models/registration.model";

@Pipe({
  name: 'registrationStatus'
})
export class RegistrationStatusPipe implements PipeTransform {
  transform(value: any):  string {
    return RegistrationStatus[value];
  }
}
