import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static notBlank(control: AbstractControl): ValidationErrors | null {
    return (control.value || '').trim().length === 0
      ? { notblank: true }
      : null;
  }

  static validName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-ZáàâãéèêíóôõúçñÁÀÂÃÉÈÍÓÔÕÚÇ'\-`\s]+ [a-zA-ZáàâãéèêíóôõúçñÁÀÂÃÉÈÍÓÔÕÚÇ'\-`\s]+$/g.test(control.value);
      return !valid
        ? { validname: true }
        : null;
    };
  }

  static validCpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const digitCount = control.value.replace(/\D/g, '').length;
      const validChar = /^[\d-.]*$/g.test(control.value)
      return (digitCount !== 11 || !validChar)
       ? { validcpf: true }
       : null;
    };
  }

  static validPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,64}$/g.test(control.value);
      return !valid
        ? { validpassword: true }
        : null;
    };
  }
}
