import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class AppValidators {
  static notBlank(control: AbstractControl): ValidationErrors | null {
    return (control.value || '').trim().length === 0 ? { 'notblank': true } : null;
  }

  static numeric(control: AbstractControl): ValidationErrors | null {
    const pattern = /^\d+$/;
    return pattern.test(control.value) ? null : { 'numeric': true };
  }

  static optional(params: { minLength: number, maxLength: number }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim();

      if(value === '') {
        return null;
      }

      if(value.length < params.minLength || value.length > params.maxLength ) {
        return { 'optional': true };
      }

      return null;
    };
  }
}
