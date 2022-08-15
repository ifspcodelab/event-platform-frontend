import { Pipe, PipeTransform } from '@angular/core';
import { ActivityType } from "../models/activity-type.model";


@Pipe({ name: 'activityTypes'})
export class ActivityTypesPipe implements PipeTransform {
  transform(value: any):  string {
    return ActivityType[value];
  }
}
