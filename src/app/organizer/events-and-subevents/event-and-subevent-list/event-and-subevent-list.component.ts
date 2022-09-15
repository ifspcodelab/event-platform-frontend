import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../../admin/loader.service";
import { EventDto } from "../../../core/models/event.model";
import { Router } from "@angular/router";
import { EventService } from "../../../core/services/event.service";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { OrganizerAreaService } from "../../../core/services/organizer-area.service";
import { SubeventDto } from "../../../core/models/subevent.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-event-and-subevent-list',
  templateUrl: './event-and-subevent-list.component.html',
  styleUrls: ['./event-and-subevent-list.component.scss']
})
export class EventAndSubeventListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  eventsDto: EventDto[] = [];
  subeventsDto: SubeventDto[] = [];
  dataSourceEvent: MatTableDataSource<EventDto>;
  dataSourceSubevent: MatTableDataSource<SubeventDto>;

  constructor(
    private eventService: EventService,
    private organizerAreaService: OrganizerAreaService,
    private router: Router,
    private loaderService: LoaderService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.loaderService.show()

    this.getEvents();
  }

  getEvents() {
    this.organizerAreaService.getEvents()
      .subscribe({
        next: events => {
        this.eventsDto = events
        this.dataSourceEvent = new MatTableDataSource<EventDto>(this.eventsDto);
        this.getSubevents();
      },
        error: error => this.handleError(error)
      })
  }

  getSubevents() {
    this.organizerAreaService.getSubevents()
      .subscribe({
        next: subevents => {
        this.subeventsDto = subevents
        this.dataSourceSubevent = new MatTableDataSource<SubeventDto>(this.subeventsDto);
        this.loaderService.hide();
      },
        error: error => this.handleError(error)
      })
  }

  openEventSessionList(eventDto: EventDto) {
    return this.router.navigate(['organizer', 'events', eventDto.id, 'sessions'])
  }

  openSubeventSessionList(subeventDto: SubeventDto) {
    return this.router.navigate(['organizer', 'sub-events', subeventDto.id, 'sessions']);
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        this.notificationService.error(error.error.violations[0].message);
      }
    }
  }
}

