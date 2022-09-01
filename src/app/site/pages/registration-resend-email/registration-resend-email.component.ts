import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { first } from "rxjs";
import { RegistrationService } from "../../../core/services/registration.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "../../../core/models/problem-detail";

@Component({
  selector: 'app-registration-resend-email',
  templateUrl: './registration-resend-email.component.html',
  styleUrls: ['./registration-resend-email.component.scss']
})

export class RegistrationResendEmailComponent implements OnInit {
  email: string;
  contact: string = "eventos.spo@ifsp.edu.br";
  verificationProblem: string = null;
  requestLoading: boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    if (typeof this.email != 'string') {
      this.router.navigate(['/']);
    }
  }

  resendEmail(): void {
    this.requestLoading = true;

    this.registrationService.postEmail(this.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Email reenviado. Em caso de não ter recebido entre em contato com a comissão");
          this.requestLoading = false;
          this.email = null;
          localStorage.removeItem('email');
        },
        error: error => {
          this.handleError(error);
          localStorage.removeItem('email');
        }
      })
  }

  handleError(error: any): void {
    this.requestLoading = false;

    if(error instanceof HttpErrorResponse) {
      if(error.status === 404) {
        const problem: ProblemDetail = error.error;
        if (problem.title === "Resource not found exception"){
          this.verificationProblem = "E-mail não encontrado";
          this.sleep(5000).then(() => this.verificationProblem = null);
        }
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "NONEXISTENT_TOKEN") {
          this.verificationProblem = "Token de verificação inexistente";
          this.sleep(5000).then(() => this.verificationProblem = null);
        }

        if(problem.title === "VERIFICATION_TOKEN_EXPIRED") {
          this.verificationProblem = "Token de verificação expirado";
          this.sleep(5000).then(() => this.verificationProblem = null);
        }

        if(problem.title === "Business rule exception") {
          this.verificationProblem = "Espere um minuto, verifique seu email novamente";
          this.sleep(5000).then(() => this.verificationProblem = null);
        }
      }
    }
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

