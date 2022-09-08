import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../core/models/event.model";
import { AccountDto } from "../../../core/models/account.model";
import { first } from "rxjs";
import { RegistrationService } from "../../../core/services/registration.service";
import { RegistrationDto, RegistrationStatus } from "../../../core/models/registration.model";
import { ConfirmationDialogComponent } from "../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../../core/services/notification.service";
import { ProblemDetail } from "../../../core/models/problem-detail";

@Component({
  selector: 'app-my-registration',
  templateUrl: './my-registration.component.html',
  styleUrls: ['./my-registration.component.scss']
})
export class MyRegistrationComponent implements OnInit {
  registrationsDto: RegistrationDto[];
  eventSelected: EventDto;
  accountDto: AccountDto;
  registrationsConfirmed: RegistrationDto[] = [];
  registrationsWaitingList: RegistrationDto[] = [];
  registrationsWaitingConfirmation: RegistrationDto[] = [];
  registrationsCanceled: RegistrationDto[] = [];
  loading: boolean = true;

  constructor(
    private registrationService: RegistrationService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.fetchUserRegistrations();
  }

  fetchUserRegistrations() {
    this.registrationService.getUserRegistrations()
      .pipe(first())
      .subscribe({
        next: registrationsDto => {
          this.registrationsDto = registrationsDto;
          this.groupRegistrations();
          this.loading = false;
        },
        error: err => {
          this.registrationsDto = []
        }
      })
  }

  groupRegistrations() {
    this.registrationsConfirmed = this.registrationsDto.filter(r =>
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.CONFIRMED.toString()
    );
    this.registrationsWaitingList = this.registrationsDto.filter(r =>
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.WAITING_LIST.toString()
    );
    this.registrationsWaitingConfirmation = this.registrationsDto.filter(r =>
      RegistrationStatus[ r.registrationStatus] == RegistrationStatus.WAITING_CONFIRMATION.toString()
    );
    this.registrationsCanceled = this.registrationsDto.filter(r =>
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_USER.toString() ||
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_ADMIN.toString() ||
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_SYSTEM.toString()
    );
  }

  cancelRegistration(registrationId: string) {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: true,
      data: {
        name: "Cancelar Inscrição",
        text: `A inscrição será cancelada de forma definitiva`,
        cancelText: "Sair",
        okText: "Cancelar Inscrição"
      }
    }).afterClosed()
      .subscribe(result => this.submitCancelRegistration(result, registrationId));
  }

  submitCancelRegistration(result: any, registrationId: string) {
    if(result) {
      this.registrationService.cancelRegistration(registrationId)
        .pipe(first())
        .subscribe({
          next: _ => {
            this.notificationService.success("Inscrição cancelada com sucesso");
            this.fetchUserRegistrations();
          },
          error: error => this.handleError(error)
        });
    }
  }

  acceptRegistration(registrationId: string) {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: true,
      data: {
        name: "Aceitar Vaga",
        text: `Deseja aceitar a vaga? Você será removido de todas as listas de espera no horário da atividade.`,
        cancelText: "Sair",
        okText: "Sim, quero participar desta atividade"
      }
    }).afterClosed()
      .subscribe(result => this.submitAcceptRegistration(result, registrationId));
  }

  submitAcceptRegistration(result: any, registrationId: string) {
    if(result) {
      this.registrationService.acceptRegistration(registrationId)
        .pipe(first())
        .subscribe({
          next: _ => {
            this.notificationService.success("Vaga aceita com sucesso!");
            this.fetchUserRegistrations();
          },
          error: error => this.handleError(error)
        });
    }
  }

  denyRegistration(registrationId: string) {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: true,
      data: {
        name: "Liberar Vaga",
        text: `Não pretende participar e deseja liberar a vaga? Sua inscrição nesta atividade será cancelada.`,
        cancelText: "Sair",
        okText: "Sim, pode liberar a vaga"
      }
    }).afterClosed()
      .subscribe(result => this.submitDenyRegistration(result, registrationId));
  }

  submitDenyRegistration(result: any, registrationId: string) {
    if(result) {
      this.registrationService.denyRegistration(registrationId)
        .pipe(first())
        .subscribe({
          next: _ => {
            this.notificationService.success("Vaga liberada com sucesso!");
            this.fetchUserRegistrations();
          },
          error: error => this.handleError(error)
        });
    }
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        this.notificationService.error(error.error.violations[0].message);
      }
    }
  }

}
