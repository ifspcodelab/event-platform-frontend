import { Component, OnInit } from '@angular/core';
import { SessionDto } from "../../../core/models/activity.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { SubeventDto } from "../../../core/models/subevent.model";
import { OrganizerAreaService } from "../../../core/services/organizer-area.service";
import { SubeventService } from "../../../core/services/subevent.service";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  eventId: string;
  subeventId: string;
  subeventDto: SubeventDto;
  sessionsDto: SessionDto[] = [];
  displayedColumns: string[] = ['title', 'seats', 'confirmedSeats', 'schedules', 'space', 'canceled'];
  dataSource: MatTableDataSource<SessionDto>;

  constructor(
    private organizerAreaService: OrganizerAreaService,
    private subeventService: SubeventService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');

    if(this.subeventId) {
      this.fetchSubEventSessions();
    } else {
      this.fetchEventSessions();
    }
  }

  private fetchSubEventSessions() {
    this.organizerAreaService.getSubeventSessions(this.subeventId)
      .subscribe(sessionsDto => {
        this.sessionsDto = sessionsDto
        this.dataSource = new MatTableDataSource<SessionDto>(this.sessionsDto);
      });
  }

  private fetchEventSessions() {
    this.organizerAreaService.getEventSessions(this.eventId)
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
