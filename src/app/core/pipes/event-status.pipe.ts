import { Pipe, PipeTransform } from '@angular/core';
import {EventStatusModel} from "../models/event-status.model";

@Pipe({
  name: 'eventStatus'
})
export class EventStatusPipe implements PipeTransform {

  transform(value: EventStatusModel): string {
    return EventStatusModel[value];
  }

}
