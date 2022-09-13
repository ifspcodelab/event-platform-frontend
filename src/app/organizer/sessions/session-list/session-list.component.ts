import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../../core/services/session.service";
import { SessionDto } from "../../../core/models/activity.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SubeventDto } from "../../../core/models/subevent.model";
import { EventDto } from "../../../core/models/event.model";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  eventId: string;
  eventDto: EventDto;
  subeventId: string;
  subeventDto: SubeventDto;
  activityId: string;
  sessionsDto: SessionDto[] = [];
  displayedColumns: string[] = ['title', 'seats', 'confirmedSeats', 'schedules', 'space', 'canceled'];
  dataSource: MatTableDataSource<SessionDto>;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');

    if(this.subeventId) {
      this.fetchSubEventSessions();
    } else {
      this.fetchEventSessions();
    }
  }

  private fetchSubEventSessions() {
    this.sessionService.getSubEventSessions(this.eventId, this.subeventId, this.activityId)
      .subscribe(sessionsDto => {
        this.sessionsDto = sessionsDto
        this.dataSource = new MatTableDataSource<SessionDto>(this.sessionsDto);
      });
  }

  private fetchEventSessions() {
    this.sessionService.getEventSessions(this.eventId, this.activityId)
      .subscribe(sessionsDto => {
        this.sessionsDto = sessionsDto
        this.dataSource = new MatTableDataSource<SessionDto>(this.sessionsDto);
      });
  }

  openSessionShow(sessionDto: SessionDto) {
    if(this.subeventId) {
      return this.router.navigate(
        ['organizer', 'sub-events', this.subeventId, 'sessions', sessionDto.id]
      );
    } else {
      return this.router.navigate(
        ['organizer', 'events', this.eventId, 'sessions', sessionDto.id]
      );
    }
  }
}

