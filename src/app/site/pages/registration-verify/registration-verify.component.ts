import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RegistrationService } from "../../../core/services/registration.service";
import { first } from "rxjs";
import { NotificationService } from "../../../core/services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "../../../core/models/problem-detail";

@Component({
  selector: 'app-registration-verify',
  templateUrl: './registration-verify.component.html',
  styleUrls: ['./registration-verify.component.scss']
})
export class RegistrationVerifyComponent implements OnInit {
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.verifyToken(this.token);
  }

  verifyToken(token: string): void {
    this.registrationService.patchAccount(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Conta verificada com sucesso!");
          this.router.navigate(['login']);
        },
        error: error => this.handleError(error)
      })
  }

  handleError(error: any): void {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "NONEXISTENT_TOKEN") {
          this.notificationService.error("Token de verificação inexistente");
        }

        if(problem.title === "VERIFICATION_TOKEN_EXPIRED") {
          this.notificationService.error("Token de verificação expirado");
        }
      }
    }
  }


}
