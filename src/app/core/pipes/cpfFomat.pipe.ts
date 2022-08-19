import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFomat'
})
export class CpfFomatPipe implements PipeTransform {

  transform(cpf: string): string {
      cpf = cpf.replace(/[^\d]/g, "");

      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
}
