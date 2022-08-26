import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { first } from "rxjs";
import { ResendEmailDto } from "../../../core/models/account.model";
import { RegistrationService } from "../../../core/services/registration.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../core/models/problem-detail";

@Component({
  selector: 'app-registration-resend-email',
  templateUrl: './registration-resend-email.component.html',
  styleUrls: ['./registration-resend-email.component.scss']
})

export class RegistrationResendEmailComponent implements OnInit {
  form: FormGroup = this.buildForm();
  userReCaptcha: string | undefined = '';
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;
  recaptchaErrorMessage: string | null = null;
  verificationProblem: string = null;
  email: string;
  emailContato: string = "https://eventos.spo.ifsp.edu.br/sedcitec-2022/contact";

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.email = this.registrationService.email;
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(350)]],
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
    this.resendEmail();
  }

  resendEmail(): void {
    this.requestLoading = true;

    const resendEmailDto = new ResendEmailDto(
      this.form.value['email'],
      this.userReCaptcha
    );

    this.registrationService.postEmail(resendEmailDto)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Por favor, acesse o e-mail cadastrado para confirmar o cadastro");
          this.router.navigate(['login']);
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

      if(error.status === 404) {
        const problem: ProblemDetail = error.error;
        if (problem.title === "Resource not found exception"){
          this.verificationProblem = "E-mail não encontrado";
        }
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "NONEXISTENT_TOKEN") {
          this.verificationProblem = "Token de verificação inexistente. Realize o cadastro novamente.";
        }

        if(problem.title === "VERIFICATION_TOKEN_EXPIRED") {
          this.verificationProblem = "Token de verificação expirado. Realize o cadastro novamente.";
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
}

