import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class AppValidators {
  static notBlank(control: AbstractControl): ValidationErrors | null {
    return (control.value || '').trim().length === 0 ? { 'notblank': true } : null;
  }

  static optional(params: { minLength: number, maxLength: number }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value().trim();
      if(value.length === 0) {
        return { 'optional': true };
      }
      return null;
    };
  }

}
