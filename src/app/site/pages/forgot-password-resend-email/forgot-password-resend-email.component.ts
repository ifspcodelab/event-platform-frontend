import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "../../../core/models/problem-detail";
import { PasswordResetService } from "../../../core/services/password-reset.service";

@Component({
  selector: 'app-forgot-password-resend-email',
  templateUrl: './forgot-password-resend-email.component.html',
  styleUrls: ['./forgot-password-resend-email.component.scss']
})
export class ForgotPasswordResendEmailComponent implements OnInit {
  email: string;
  contact: string = "social.spo@ifsp.edu.br";
  passwordResetProblem: string = null;
  requestLoading: boolean = false;

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.email = this.passwordResetService.email;
  }

  resendEmail(): void {
    this.requestLoading = true;

    this.passwordResetService.postEmail(this.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Email reenviado. Em caso de não ter recebido entre em contato com a comissão");
          this.requestLoading = false;
          this.email = null;
        },
        error: error => {
          this.handleError(error);

        }
      })
  }

  handleError(error: any): void {
    this.requestLoading = false;

    if(error instanceof HttpErrorResponse) {
      if(error.status === 404) {
        const problem: ProblemDetail = error.error;
        if (problem.title === "Resource not found exception"){
          this.passwordResetProblem = "E-mail não encontrado";
          this.sleep(5000).then(() => this.passwordResetProblem = null);
        }
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "Token not valid") {
          this.passwordResetProblem = "Token de redefinição de senha inexistente";
          this.sleep(5000).then(() => this.passwordResetProblem = null);
        }

        if(problem.title === "RESET_TOKEN_EXPIRED") {
          this.passwordResetProblem = "Token de redefinição de senha expirado";
          this.sleep(5000).then(() => this.passwordResetProblem = null);
        }

        if(problem.title === "UNVERIFIED_ACCOUNT") {
          this.passwordResetProblem = "Por favor, faça a verificação do seu email";
          this.sleep(5000).then(() => this.passwordResetProblem = null);
        }

        if(problem.title === "Business rule exception") {
          this.passwordResetProblem = "Espere um minuto para reenviar o email";
          this.sleep(5000).then(() => this.passwordResetProblem = null);
        }
      }
    }
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}


