import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkOrNotPipe'
})
export class CheckOrNotPipe implements PipeTransform {

  transform(value: boolean): string {
    switch(value) {
      case true: return 'check';
      case false: return 'cancel';
    }
    return 'cancel';
  }

}
