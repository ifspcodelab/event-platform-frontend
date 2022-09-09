import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { RegistrationService } from "../../../core/services/registration.service";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-my-registration-accept-seat',
  templateUrl: './my-registration-accept-seat.component.html',
  styleUrls: ['./my-registration-accept-seat.component.scss']
})
export class MyRegistrationAcceptSeatComponent implements OnInit {
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
      this.notificationService.error("Código inválido para aceitar uma vaga")
      this.router.navigate(['minhas-inscricoes']);
    }

    this.submitDenyRegistration(this.registrationId)
  }

  submitDenyRegistration(registrationId: string) {
    this.registrationService.acceptRegistration(registrationId)
      .pipe(first())
      .subscribe({
        next: _ => {
          this.notificationService.success("Vaga aceita com sucesso!");
          this.router.navigate(['minhas-inscricoes'], { queryParams: { tab: '0' }});
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
