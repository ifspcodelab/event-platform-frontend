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
      if(control.value === '' || control.value === null || control.value === undefined) {
        return null;
      }

      const value = control.value.trim();

      if(value.length < params.minLength || value.length > params.maxLength ) {
        return { 'optional': true };
      }

      return null;
    };
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

  static hasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /\d/.test(control.value);
      return !valid
        ? { hasnumber: true }
        : null;
    };
  }

  static hasLowerCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /[a-z]/.test(control.value);
      return !valid
        ? { haslowercase: true }
        : null;
    };
  }

  static hasCapitalCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /[A-Z]/.test(control.value);
      return !valid
        ? { hascapitalcase: true }
        : null;
    };
  }

  static hasSpecialCharacter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /[\W_]/.test(control.value);
      return !valid
        ? { hasspecialcharacter: true }
        : null;
    };
  }

  static isEmailDomainValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidDomains = ['@gnail.com', '@alino.ifsp.edu.br', '@aluno.ifsp.com.br'];
      const domainIndex = control.value.indexOf('@');
      if (domainIndex == -1) {
        return null;
      }
      const domain = control.value.slice(domainIndex).trim();
      const includes = invalidDomains.includes(domain);
      return includes
        ? { isemaildomainvalid: true }
        : null;
    };
  }

}
