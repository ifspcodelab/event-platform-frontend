import { Component, OnInit } from '@angular/core';
import { SessionDto } from "../../../core/models/activity.model";
import { OrganizerAreaService } from "../../../core/services/organizer-area.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { first } from "rxjs";
import { RegistrationService } from "../../../core/services/registration.service";
import { RegistrationDto, RegistrationStatus } from "../../../core/models/registration.model";

@Component({
  selector: 'app-session-list-print',
  templateUrl: './session-list-print.component.html',
  styleUrls: ['./session-list-print.component.scss']
})
export class SessionListPrintComponent implements OnInit {
  eventId: string = null;
  subeventId: string = null;
  activityId: string;
  sessionId: string;
  sessionDto: SessionDto = null;
  registrationsDto: RegistrationDto[] = [];

  constructor(
    private organizerAreaService: OrganizerAreaService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private registrationService: RegistrationService,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.activityId = this.route.snapshot.paramMap.get('activityId');
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');

    if(this.subeventId) {
      this.fetchSubEventSession();
    } else {
      this.fetchEventSession();
    }
  }

  private fetchSubEventSession() {
    this.organizerAreaService.getSubeventSession(this.subeventId, this.sessionId)
      .pipe(first())
      .subscribe(sessionDto => {
        this.sessionDto = sessionDto;
        this.fetchSubEventRegistrations();
        document.title = `${this.sessionDto.activity.title}_${this.sessionDto.title}_print`;
      })
  }

  private fetchEventSession() {
    this.organizerAreaService.getEventSession(this.eventId, this.sessionId)
      .pipe(first())
      .subscribe(sessionDto => {
        this.sessionDto = sessionDto;
        this.fetchEventRegistrations();
        document.title = `${this.sessionDto.activity.title}_${this.sessionDto.title}_print`;
      })
  }

  private fetchSubEventRegistrations() {
    this.registrationService.getSubEventRegistrations(this.eventId, this.subeventId, this.activityId, this.sessionId)
      .subscribe(registrationsDto => {
        this.registrationsDto = registrationsDto
      });
  }

  private fetchEventRegistrations() {
    this.registrationService.getEventRegistrations(this.eventId, this.activityId, this.sessionId)
      .subscribe(registrationsDto => {
        this.registrationsDto = registrationsDto
      });
  }

  confirmedRegistrations(): RegistrationDto[] {
    return this.registrationsDto
      .filter(r => RegistrationStatus[r.registrationStatus] == RegistrationStatus.CONFIRMED.toString())
      .sort((a,b) => (a.account.name > b.account.name) ? 1 : ((b.account.name > a.account.name) ? -1 : 0));
  }

  waitingList(): RegistrationDto[] {
    return this.registrationsDto
      .filter(r =>
        RegistrationStatus[r.registrationStatus] == RegistrationStatus.WAITING_CONFIRMATION.toString() ||
        RegistrationStatus[r.registrationStatus] == RegistrationStatus.WAITING_LIST.toString()
      )
      .sort((a,b) => (a.date > b.date) ? 1 : ((b.date> a.date) ? -1 : 0));
  }
}
