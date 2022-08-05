import { Pipe, PipeTransform } from '@angular/core';
import { OrganizerType } from "../models/organizer-type.model";

@Pipe({
  name: 'organizerType'
})
export class OrganizerTypePipe implements PipeTransform {

  transform(value: OrganizerType): string {
    return OrganizerType[value];
  }

}
