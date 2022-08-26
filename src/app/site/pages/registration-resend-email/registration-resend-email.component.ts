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
  contato: string = "https://eventos.spo.ifsp.edu.br/sedcitec-2022/contact";
  requestLoading: boolean = false;
  verificationProblem: string = null;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.email = this.registrationService.email;
  }

  resendEmail(): void {
    this.requestLoading = true;

    this.registrationService.postEmail(this.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Por favor, acesse o e-mail cadastrado para confirmar o cadastro");
        },
        error: error => {
          this.handleError(error)
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
}

