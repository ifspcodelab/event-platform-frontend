import { Pipe, PipeTransform } from '@angular/core';
import {SpaceType} from "../models/spaceType.model";

@Pipe({
  name: 'spaceTypes'
})
export class SpaceTypesPipe implements PipeTransform {

  transform(value: any):  string {
    return SpaceType[value];
  }
}
