import { Component, Input, OnInit } from '@angular/core';
import { RegistrationDto, RegistrationStatus } from "../../../../core/models/registration.model";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SessionDto, SessionScheduleDto } from "../../../../core/models/activity.model";
import { AttendanceService } from "../../../../core/services/attendance.service";
import { AttendanceCreateDto, AttendanceDto } from "../../../../core/models/attendance.model";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "../../../../core/services/notification.service";
import * as XLSX from 'xlsx';
import { CpfFomatPipe } from "../../../../core/pipes/cpfFomat.pipe"
import { AccountTypePipe } from "../../../../core/pipes/account-type.pipe";

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  @Input()
  eventId: string;
  @Input()
  subeventId: string;
  @Input()
  activityId: string;
  @Input()
  sessionId: string;
  @Input()
  registrationsDto: RegistrationDto[] = [];
  displayedColumns: string[] = ['attendance', 'account.name', 'account.cpf'];
  @Input()
  sessionSchedule: SessionScheduleDto;
  @Input()
  session: SessionDto;

  attendances: AttendanceDto[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private router: Router,
    private notificationService: NotificationService,
    private _liveAnnouncer: LiveAnnouncer,
    private cpfFormatPipe: CpfFomatPipe,
    private accountTypePipe: AccountTypePipe,
  ) { }

  ngOnInit(): void {
    this.registrationsDto = this.confirmedRegistrations();
    if(this.subeventId) {
      this.getSubEventAttendances();
    } else {
      this.getEventAttendances();
    }
  }

  private getSubEventAttendances() {
    this.attendanceService.getSubEventAttendances(this.eventId, this.subeventId, this.activityId, this.sessionId, this.sessionSchedule.id)
      .pipe(first())
      .subscribe({
        next: attendancesDto => {
          this.attendances = attendancesDto;
        },
        error: err => this.handleError(err)
      });
  }

  private getEventAttendances() {
    this.attendanceService.getEventAttendances(this.eventId, this.activityId, this.sessionId, this.sessionSchedule.id)
      .pipe(first())
      .subscribe({
        next: attendancesDto => {
          this.attendances = attendancesDto;
        },
        error: err => this.handleError(err)
      });
  }

  confirmedRegistrations(): RegistrationDto[] {
    return this.registrationsDto
      .filter(r => RegistrationStatus[r.registrationStatus] == RegistrationStatus.CONFIRMED.toString())
      .sort((a,b) => (a.account.name.localeCompare(b.account.name)));
  }

  toggle(registrationDto: RegistrationDto) {
    if(this.hasAttendance(registrationDto)) {
      const attendance = this.attendances.find(a => a.registrationId == registrationDto.id);
      if(this.subeventId) {
        this.deleteSubEventAttendance(attendance);
      } else {
        this.deleteEventAttendance(attendance);
      }
    } else {
      if(this.subeventId) {
        this.registerSubEventAttendance({ registrationId: registrationDto.id });
      } else {
        this.registerEventAttendance({ registrationId: registrationDto.id });
      }
    }
  }

  private deleteSubEventAttendance(attendance: AttendanceDto) {
    this.attendanceService.deleteSubEventAttendance(
      this.eventId, this.subeventId, this.activityId, this.sessionId, this.sessionSchedule.id, attendance.id
    )
      .pipe(first())
      .subscribe({
        next: _ => this.attendances = this.attendances.filter(a => a.id != attendance.id),
        error: err => this.handleError(err)
      })
  }

  private deleteEventAttendance(attendance: AttendanceDto) {
    this.attendanceService.deleteEventAttendance(
      this.eventId, this.activityId, this.sessionId, this.sessionSchedule.id, attendance.id
    )
      .pipe(first())
      .subscribe({
        next: _ => this.attendances = this.attendances.filter(a => a.id != attendance.id),
        error: err => this.handleError(err)
      })
  }

  private registerSubEventAttendance(attendanceCreateDto: AttendanceCreateDto) {
    this.attendanceService.postSubEventAttendance(
      this.eventId, this.subeventId, this.activityId, this.sessionId, this.sessionSchedule.id, attendanceCreateDto
    )
      .pipe(first())
      .subscribe({
        next: attendanceDto => this.attendances = [attendanceDto, ...this.attendances],
        error: err => this.handleError(err)
      })
  }

  private registerEventAttendance(attendanceCreateDto: AttendanceCreateDto) {
    this.attendanceService.postEventAttendance(
      this.eventId, this.activityId, this.sessionId, this.sessionSchedule.id, attendanceCreateDto
    )
      .pipe(first())
      .subscribe({
        next: attendanceDto => this.attendances = [attendanceDto, ...this.attendances],
        error: err => this.handleError(err)
      })
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      this.notificationService.error(error.error.violations[0].message);
    }
  }

  hasAttendance(registrationDto: RegistrationDto) {
    return this.attendances.some(a => a.registrationId == registrationDto.id);
  }

  attendanceDisabled(): boolean {
    const sessionDate = new Date(this.sessionSchedule.executionStart.substr(0, 10).replace(/-/g, '/'));
    const today = new Date();
    return today < sessionDate
  }

  downloadCertificationData() {
    const jsonData = this.attendances.map(attendance => {
      const registration = this.registrationsDto.find(r => r.id == attendance.registrationId);
      return {
        cpf: this.cpfFormatPipe.transform(registration.account.cpf),
        name: registration.account.name,
        email: registration.account.email,
        perfil: this.accountTypePipe.transform(registration.account.type)
      }
    }).sort((a,b) => (a.name.localeCompare(b.name)));

    const worksheet = XLSX.utils.json_to_sheet(jsonData, { header: [], skipHeader: true });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

    const fileName = `${this.session.activity.title} - ${this.session.title} - ${new Date().toISOString()}.xlsx`

    XLSX.writeFile(workbook, fileName);
  }
}
