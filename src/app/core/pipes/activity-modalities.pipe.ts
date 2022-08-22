import { Pipe, PipeTransform } from '@angular/core';
import { ActivityModality } from "../models/activity-modality.model";


@Pipe({ name: 'activityModalities'})
export class ActivityModalitiesPipe implements PipeTransform {
  transform(value: any):  string {
    return ActivityModality[value];
  }
}
