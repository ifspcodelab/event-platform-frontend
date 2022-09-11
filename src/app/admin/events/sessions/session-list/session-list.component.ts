import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SessionDto } from "../../../../core/models/activity.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { SessionService } from "../../../../core/services/session.service";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  @Input()
  eventId: string;
  @Input()
  subeventId: string;
  @Input()
  activityId: string;
  sessionsDto: SessionDto[] = [];
  displayedColumns: string[] = ['title', 'seats', 'confirmedSeats', 'schedules', 'space', 'canceled'];
  dataSource: MatTableDataSource<SessionDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
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
        ['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', this.activityId, 'sessions', sessionDto.id]
      );
    } else {
      return this.router.navigate(
        ['admin', 'events', this.eventId, 'activities', this.activityId, 'sessions', sessionDto.id]
      );
    }
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
