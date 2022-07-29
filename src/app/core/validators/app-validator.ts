import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static notBlank(control: AbstractControl): ValidationErrors | null {
    return (control.value || '').trim().length === 0
      ? { notblank: true }
      : null;
  }

  static validName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-ZáàâãéèêíóôõúçñÁÀÂÃÉÈÍÓÔÕÚÇ'\-`\s]*$/g.test(control.value);
      return !valid
        ? { validname: true }
        : null;
    };
  }

  static validCpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const digitCount = control.value.replace(/\D/g, '').length;
      return digitCount !== 11
       ? { validcpf: true }
       : null;
    };
  }

  static validPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\x20-\x2F\x3A-\x40\x5B-\x60\x7B-\x7EáàâãéèêíóôõúçñÁÀÂÃÉÈÍÓÔÕÚÇ])[\x20-\x7FáàâãéèêíóôõúçñÁÀÂÃÉÈÍÓÔÕÚÇ]{8,64}$/g.test(control.value);
      return !valid
        ? { validpassword: true }
        : null;
    };
  }
}
