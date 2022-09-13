import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { ActivityForSiteDto, SessionForSiteDto } from "../../../models/activity.model";
import { SiteService } from "../../../services/site.service";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivityModality } from "../../../../core/models/activity-modality.model";
import { RegistrationService } from "../../../../core/services/registration.service";
import { JwtService } from "../../../../core/services/jwtservice.service";
import { NotificationService } from "../../../../core/services/notification.service";
import { ProblemDetail } from "../../../../core/models/problem-detail";
import { RegistrationDto } from "../../../../core/models/registration.model";

@Component({
  selector: 'app-activity-show',
  templateUrl: './activity-show.component.html',
  styleUrls: ['./activity-show.component.scss']
})
export class ActivityShowComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;
  eventMode: boolean = true;
  activitySlug: string;
  activity: ActivityForSiteDto;
  loading: boolean = true;
  ActivityModality = ActivityModality;
  actionLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private registrationService: RegistrationService,
    private jwtService: JwtService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.eventDto = this.route.parent.snapshot.data['event'];
    this.activitySlug = this.route.snapshot.paramMap.get('activitySlug');

    if(this.eventDto) {
      this.fetchEventActivity()
    } else {
      this.eventMode = false;
      const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
      this.eventDto = subeventDtoResolved.eventDto;
      this.subeventDto = subeventDtoResolved.subeventDto;
      this.fetchSubEventActivity()
    }
  }

  private fetchEventActivity() {
    this.siteService.getEventActivity(this.eventDto.id, this.activitySlug)
      .pipe(first())
      .subscribe({
        next: activity => {
          this.activity = activity;
          this.activity.sessions = this.activity.sessions.sort((a, b) => this.sortBySessionScheduler(a, b));
          document.title = `${this.activity.title} - ${this.eventDto.title}`;
          this.loading = false;
        },
        error: error => this.handleError(error)
      });
  }

  private fetchSubEventActivity() {
    this.siteService.getSubEventActivity(this.eventDto.id, this.subeventDto.id, this.activitySlug)
      .pipe(first())
      .subscribe({
        next: activity => {
          this.activity = activity;
          this.activity.sessions = this.activity.sessions.sort((a, b) => this.sortBySessionScheduler(a, b));
          document.title = `${this.activity.title} - ${this.subeventDto.title}`;
          this.loading = false;
        },
        error: error => this.handleError(error)
      });
  }

  sortBySessionScheduler(a: SessionForSiteDto, b: SessionForSiteDto): number {
    return (a.sessionSchedules[0].executionStart > b.sessionSchedules[0].executionStart) ? 1
      : ((b.sessionSchedules[0].executionStart > a.sessionSchedules[0].executionStart) ? -1 : 0);
  }

  register(session: SessionForSiteDto) {
    if(!this.jwtService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    this.actionLoading = true;
    this.registrationService.postUserSessionRegistration(session.id)
      .pipe(first())
      .subscribe({
        next: _ => {
          this.actionLoading = false;
          this.router.navigate(['/minhas-inscricoes']);
        },
        error: error => this.handleError(error)
        }
      )
  }

  registerOnWaitingList(session: SessionForSiteDto) {
    if(!this.jwtService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    this.actionLoading = true;
    this.registrationService.postUserSessionRegistrationWaitList(session.id)
      .pipe(first())
      .subscribe({
          next: _ => {
            this.actionLoading = false;
            this.router.navigate(['/minhas-inscricoes'], { queryParams: { tab: '1' }});
          },
          error: error => this.handleError(error)
        }
      )
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 404) {
        this.router.navigate(['/']);
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;

        if(problem.violations[0].name == "REGISTRATION_CREATE_WITH_NO_SEATS_AVAILABLE") {
          this.notificationService.error("Vagas esgotadas. Recarregue a página.");
        } else {
          this.notificationService.error(problem.violations[0].message);
        }
      }
      this.actionLoading = false;
    }
  }

  getSpeakerNames(speakers: string[]) {
    return speakers.reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ' e ') + value);
  }

  getBackLink(): string {
    return this.subeventDto ?
      `/${this.eventDto.slug}/sub-events/${this.subeventDto.slug}/schedule` :
      `/${this.eventDto.slug}/schedule`;
  }

  registrationIsOpen() {
    const registrationStartDate = new Date(this.eventDto.registrationPeriod.startDate.replace(/-/g, '/'));
    let registrationEndDate = new Date(this.eventDto.registrationPeriod.endDate.replace(/-/g, '/'));
    registrationEndDate.setDate(registrationEndDate.getDate() + 1);
    const now = new Date();
    return now >= registrationStartDate && now < registrationEndDate;
  }

  needRegistration() {
    return this.activity.needRegistration
  }

  hasSeats(session: SessionForSiteDto) {
    return session.seats > session.confirmedSeats;
  }

  showUrl() {
    const modality = ActivityModality[this.activity.modality];
    return modality == ActivityModality.ONLINE.toString() || modality == ActivityModality.HYBRID.toString();
  }

  showLocation() {
    const modality = ActivityModality[this.activity.modality];
    return modality == ActivityModality.IN_PERSON.toString() || modality == ActivityModality.HYBRID.toString();
  }
}
