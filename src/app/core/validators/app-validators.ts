import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class AppValidators {

  static notBlank(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'notblank': true };
  }

  static validPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\x20-\x2F\x3A-\x40\x5B-\x60\x7B-\x7EáàâãéèêíóôõúçñÁÀÂÃÉÈÍÓÔÕÚÇ])[\x20-\x7FáàâãéèêíóôõúçñÁÀÂÃÉÈÍÓÔÕÚÇ]{8,64}$/g.test(control.value);
      return !valid
        ? {validpassword: true}
        : null;
    };
  }
}
