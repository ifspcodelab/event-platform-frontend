import { Component, OnInit } from '@angular/core';
import { SessionDto, SessionsGroupByDate } from "../../../core/models/activity.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { SubeventDto } from "../../../core/models/subevent.model";
import { OrganizerAreaService } from "../../../core/services/organizer-area.service";
import { SubeventService } from "../../../core/services/subevent.service";
import {LoaderService} from "../../../admin/loader.service";
import {HttpErrorResponse} from "@angular/common/http";
// import { EventService } from "../../../core/services/event.service";
// import { EventDto } from "../../../core/models/event.model";
// import { Observable } from "rxjs";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  eventId: string;
  // eventDto$: Observable<EventDto>;
  // eventDto: EventDto;
  subeventId: string;
  subeventDto: SubeventDto;
  sessionsDto: SessionDto[] = [];
  displayedColumns: string[] = ['title', 'seats', 'confirmedSeats', 'schedules', 'space', 'canceled'];
  dataSource: MatTableDataSource<SessionDto>;
  // sessionsGroupByDates: SessionsGroupByDate[] = [];

  constructor(
    private organizerAreaService: OrganizerAreaService,
    // private eventService: EventService,
    private subeventService: SubeventService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    // this.eventDto$ = this.eventService.getEventById(this.eventId);

    if(this.subeventId) {
      this.fetchSubEventSessions();
    } else {
      this.fetchEventSessions();
    }
  }

  private fetchSubEventSessions() {
    this.organizerAreaService.getSubeventSessions(this.subeventId)
      .subscribe(sessions => {
        this.sessionsDto = sessions
        this.dataSource = new MatTableDataSource<SessionDto>(this.sessionsDto);
        this.loaderService.hide();
      });
  }

  private fetchEventSessions() {
    this.organizerAreaService.getEventSessions(this.eventId)
      .subscribe(sessions => {
        this.sessionsDto = sessions
        this.dataSource = new MatTableDataSource<SessionDto>(this.sessionsDto);
        this.loaderService.hide();
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

  // getSpeakerNames(speakers: string[]) {
  //   return speakers.reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ' e ') + value);
  // }

  getBackUrl() {
      this.router.navigate(['organizer']);
  }
}

