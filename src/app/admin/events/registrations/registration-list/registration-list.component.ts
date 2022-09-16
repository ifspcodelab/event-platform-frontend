import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { RegistrationDto, RegistrationStatus } from "../../../../core/models/registration.model";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { RegistrationService } from "../../../../core/services/registration.service";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SessionDto } from "../../../../core/models/activity.model";

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
  dataSource: MatTableDataSource<RegistrationDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  confirmedListDto: RegistrationDto[] = [];
  confirmedColumns: string[] = ['date', 'account.name', 'account.cpf', 'action'];

  waitingListDisplayedColumns: string[] = ['date', 'account.name', 'account.cpf', 'action'];
  waitingListDto: RegistrationDto[] = [];

  canceledListDisplayedColumns: string[] = ['date', 'account.name', 'account.cpf', 'status'];
  canceledListDto: RegistrationDto[] = [];

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.confirmedListDto = this.registrationsDto
      .filter(r => RegistrationStatus[r.registrationStatus] == RegistrationStatus.CONFIRMED.toString())
      .sort((a,b) => this.sortByDate(a,b))
    this.dataSource = new MatTableDataSource<RegistrationDto>(this.confirmedListDto);

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

    this.setSortingDataAccessor();
  }

  private sortByDate(a: RegistrationDto, b: RegistrationDto): number {
    return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);
  }

  private setSortingDataAccessor() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.date;
        case 'account.name': return item.account.name;
        case 'account.cpf': return item.account.cpf;
        case 'status': return item.registrationStatus;
        case 'timeEmailWasSent': return item.timeEmailWasSent;
        default: return item.id;
      }
    };
    this.dataSource.sort = this.sort;
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

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;
    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
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


  cancelDisabled(): boolean {
    const sessionDate = new Date(this.session.sessionSchedules[0].executionStart.substr(0, 10).replace(/-/g, '/'));
    const today = new Date();
    return today < sessionDate
  }
}
