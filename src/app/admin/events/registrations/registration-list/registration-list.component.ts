import { Component, Input, OnInit } from '@angular/core';
import { RegistrationDto, RegistrationStatus } from "../../../../core/models/registration.model";
import { Router } from "@angular/router";
import { RegistrationService } from "../../../../core/services/registration.service";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SessionDto } from "../../../../core/models/activity.model";
import { SessionRegistrationFormComponent } from "../../sessions/session-registration-form/session-registration-form.component";
import { NotificationService } from "../../../../core/services/notification.service";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  @Input()
  eventId: string;
  @Input()
  subeventId: string;
  @Input()
  activityId: string;
  @Input()
  sessionId: string;
  @Input()
  session: SessionDto;
  @Input()
  registrationsDto: RegistrationDto[] = [];

  confirmedListDto: RegistrationDto[] = [];
  confirmedColumns: string[] = ['date', 'account.name', 'account.cpf', 'action'];

  waitingListDisplayedColumns: string[] = ['date', 'account.name', 'account.cpf', 'action'];
  waitingListDto: RegistrationDto[] = [];

  canceledListDisplayedColumns: string[] = ['date', 'account.name', 'account.cpf', 'status'];
  canceledListDto: RegistrationDto[] = [];

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.confirmedListDto = this.registrationsDto
      .filter(r => RegistrationStatus[r.registrationStatus] == RegistrationStatus.CONFIRMED.toString())
      .sort((a,b) => this.sortByDate(a,b))

    this.waitingListDto = this.registrationsDto
      .filter(r =>
        RegistrationStatus[r.registrationStatus] == RegistrationStatus.WAITING_LIST.toString() ||
        RegistrationStatus[r.registrationStatus] == RegistrationStatus.WAITING_LIST.toString()
      )
      .sort((a,b) => this.sortByDate(a,b));

    this.canceledListDto = this.registrationsDto
      .filter(r =>
        RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_USER.toString() ||
        RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_ADMIN.toString() ||
        RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_SYSTEM.toString()
      )
      .sort((a,b) => this.sortByDate(a,b));
  }

  private sortByDate(a: RegistrationDto, b: RegistrationDto): number {
    return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);
  }

  confirmedRegistrations(): number {
    return this.registrationsDto.filter(r => RegistrationStatus[r.registrationStatus] == RegistrationStatus.CONFIRMED.toString()).length;
  }

  waitListRegistrations(): number {
    return this.registrationsDto.filter(r => RegistrationStatus[r.registrationStatus] == RegistrationStatus.WAITING_LIST.toString()).length;
  }

  canceledRegistrations(): number {
    return this.registrationsDto.filter(r =>
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_USER.toString() ||
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_ADMIN.toString() ||
      RegistrationStatus[r.registrationStatus] == RegistrationStatus.CANCELED_BY_SYSTEM.toString()
    ).length;
  }

  waitConfirmationRegistrations(): number {
    return this.registrationsDto.filter(r => RegistrationStatus[r.registrationStatus] == RegistrationStatus.WAITING_CONFIRMATION.toString()).length;
  }

  private getConfirmationDialogConfig(registration: RegistrationDto) {
    return {
      autoFocus: true,
      data: {
        name: "Cancelar Inscrição",
        text: `A inscrição do participante  ${registration.account.name} será cancelada de forma definitiva.`,
        cancelText: "Sair",
        okText: "Cancelar Inscrição"
      }
    }
  }

  openCancelConfirmationDialog(registration: RegistrationDto) {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfig(registration))
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.cancelRegistration(registration)
        }
      });
  }

  cancelRegistration(registration: RegistrationDto) {
    console.log(registration)
    const registrationDto = this.confirmedListDto.find(r => r.id != registration.id);
    registrationDto.registrationStatus = RegistrationStatus.CANCELED_BY_ADMIN;

    // this.dataSource = new MatTableDataSource<RegistrationDto>(this.confirmedListDto);
  }

  sessionScheduleDisabled(): boolean {
    const sessionDate = new Date(this.session.sessionSchedules[0].executionStart.substr(0, 10).replace(/-/g, '/'));
    const today = new Date();
    return today < sessionDate
  }

  private getDialogConfig() {
    return {
      autoFocus: true,
      width: '450px',
      data: { eventId: this.eventId, subeventId: this.subeventId, activityId: this.activityId, sessionId: this.sessionId }
    };
  }

  openSessionRegistrationForm() {
    this.dialog.open(SessionRegistrationFormComponent, this.getDialogConfig()).afterClosed()
      .subscribe(registrationDto => {
        if (registrationDto) {
          this.notificationService.success("Participante adicionado com sucesso");
          this.confirmedListDto = [...this.confirmedListDto, registrationDto];
        }
      });
  }
}
