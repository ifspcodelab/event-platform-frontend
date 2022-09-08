import { Pipe, PipeTransform } from '@angular/core';
import { SearchType } from "../models/search-types.model";

@Pipe({
  name: 'searchTypes'
})
export class SearchTypesPipe implements PipeTransform {

  transform(value: any): string {
    return SearchType[value];
  }
}
