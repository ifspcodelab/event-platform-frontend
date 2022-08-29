import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { first } from 'rxjs';
import { AppValidators } from 'src/app/core/validators/app-validator';
import { AccountCreateDto } from "../../../core/models/account.model";
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { ProblemDetail, Violation } from "../../../core/models/problem-detail";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = this.buildForm();
  userReCaptcha: string | undefined = '';
  hide: boolean = true;
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;
  recaptchaErrorMessage: string | null = null;

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    localStorage.setItem('email', this.form.value['email']);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), AppValidators.validName()]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(350)]],
      cpf: ['', [Validators.required, AppValidators.validCpf()]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64), AppValidators.validPassword()]],
      agreed: ['', [Validators.requiredTrue]]
    });
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  onSubmit(): void {
    if (this.form.invalid || this.userReCaptcha == '') {
      return;
    }
    this.createAccount();
  }

  createAccount(): void {
    this.requestLoading = true;

    const accountCreateDto = new AccountCreateDto(
        this.form.value['name'],
        this.form.value['email'],
        this.form.value['cpf'],
        this.form.value['password'],
        this.form.value['agreed'],
        this.userReCaptcha
    );

    this.registrationService.postAccount(accountCreateDto)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Por favor, acesse o e-mail cadastrado para confirmar o cadastro");
          this.router.navigate(['cadastro','reenviar-email'], {state: this.form.value['email']});
        },
        error: error => {
          this.handleError(error)
          this.refreshRecaptcha();
        }
      })
  }

  handleError(error: any): void {
    this.requestLoading = false;

    if(error instanceof HttpErrorResponse) {
      if(error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.name);
          if(formControl) {
            formControl.setErrors({ serverError: violation.message });
          }
        })
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "Resource already exists exception") {
          if(problem.violations.length > 0) {
            const violation = problem.violations[0];
            if(violation.name === "E-mail") {
              this.field('email').setErrors({ serverError: 'Já existe uma conta com esse e-mail' });
            }
            if(violation.name === "CPF") {
              this.field('cpf').setErrors({ serverError: 'Já existe uma conta com este CPF' });
            }
          }
        }
        if(problem.title === "Invalid recaptcha") {
          this.recaptchaErrorMessage = "Recaptcha inválido, por favor realize novamente o desafio ou atualize a página";
        }
      }
    }
  }

  resolved(captchaResponse: string): void {
    this.userReCaptcha = captchaResponse;
    this.recaptchaErrorMessage = null;
  }

  refreshRecaptcha(): void {
    grecaptcha.reset();
  }

  openNewWindowToTerms() {
    window.open("/termos");
  }
}

