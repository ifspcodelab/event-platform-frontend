import { Component, OnInit } from '@angular/core';
import { SessionDto } from "../../../core/models/activity.model";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";
import { first } from "rxjs";
import { OrganizerAreaService } from "../../../core/services/organizer-area.service";

@Component({
  selector: 'app-session-show',
  templateUrl: './session-show.component.html',
  styleUrls: ['./session-show.component.scss']
})
export class SessionShowComponent implements OnInit {
  eventId: string = null;
  subeventId: string = null;
  sessionId: string;
  sessionDto: SessionDto = null;

  constructor(
    private organizerAreaService: OrganizerAreaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
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
      })
  }

  private fetchEventSession() {
    this.organizerAreaService.getEventSession(this.eventId, this.sessionId)
      .pipe(first())
      .subscribe(sessionDto => {
        this.sessionDto = sessionDto;
      })
  }

  backLink() {
    if(this.subeventId) {
      return this.router.navigate(
        ['organizer', 'sub-events', this.subeventId, 'sessions']
      );
    } else {
      return this.router.navigate(
        ['organizer', 'events', this.eventId, 'sessions']
      );
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

