import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { first } from "rxjs";
import { RegistrationService } from "../../../core/services/registration.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-my-registration-deny-seat',
  templateUrl: './my-registration-deny-seat.component.html',
  styleUrls: ['./my-registration-deny-seat.component.scss']
})
export class MyRegistrationDenySeatComponent implements OnInit {
  registrationId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.registrationId = this.route.snapshot.paramMap.get('registrationId');

    if(!this.registrationId) {
      this.notificationService.error("Código inválido para recusar uma vaga")
      this.router.navigate(['minhas-inscricoes']);
    }

    this.submitDenyRegistration(this.registrationId)
  }

  submitDenyRegistration(registrationId: string) {
    this.registrationService.denyRegistration(registrationId)
      .pipe(first())
      .subscribe({
        next: _ => {
          this.notificationService.success("Vaga liberada com sucesso!");
          this.router.navigate(['minhas-inscricoes'], { queryParams: { tab: '2' }});
        },
        error: error => this.handleError(error)
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        this.notificationService.error(error.error.violations[0].message);
      }
      this.router.navigate(['minhas-inscricoes']);
    }
  }
}
