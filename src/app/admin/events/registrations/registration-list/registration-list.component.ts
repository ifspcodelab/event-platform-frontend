import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { RegistrationDto, RegistrationStatus } from "../../../../core/models/registration.model";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { RegistrationService } from "../../../../core/services/registration.service";

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
  registrationsDto: RegistrationDto[] = [];
  displayedColumns: string[] = ['date', 'account.name', 'account.email', 'status', 'timeEmailWasSent'];
  dataSource: MatTableDataSource<RegistrationDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    if(this.subeventId) {
      this.fetchSubEventRegistrations();
    } else {
      this.fetchEventRegistrations();
    }
  }

  private fetchSubEventRegistrations() {
    this.registrationService.getSubEventRegistrations(this.eventId, this.subeventId, this.activityId, this.sessionId)
      .subscribe(registrationsDto => {
        this.registrationsDto = registrationsDto
        this.dataSource = new MatTableDataSource<RegistrationDto>(this.registrationsDto);
        this.setSortingDataAccessor();
      });
  }
  private fetchEventRegistrations() {
    this.registrationService.getEventRegistrations(this.eventId, this.activityId, this.sessionId)
      .subscribe(registrationsDto => {
        this.registrationsDto = registrationsDto
        this.dataSource = new MatTableDataSource<RegistrationDto>(this.registrationsDto);
        this.setSortingDataAccessor();
      });
  }

  private setSortingDataAccessor() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'date': return item.date;
        case 'account.name': return item.account.name;
        case 'account.email': return item.account.email;
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
}