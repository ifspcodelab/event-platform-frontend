import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from "../../../admin/loader.service";
import { EventDto } from "../../../core/models/event.model";
import { Router } from "@angular/router";
import { EventService } from "../../../core/services/event.service";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { OrganizerAreaService } from "../../../core/services/organizer-area.service";
import { SubeventDto } from "../../../core/models/subevent.model";

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
  ) { }

  ngOnInit(): void {
    this.loaderService.show()

    this.organizerAreaService.getEvents()
      .subscribe(events => {
        this.eventsDto = events
        this.dataSourceEvent = new MatTableDataSource<EventDto>(this.eventsDto);
        this.loaderService.hide();
      })

    this.organizerAreaService.getSubevents()
      .subscribe(subevents => {
        this.subeventsDto = subevents
        this.dataSourceSubevent = new MatTableDataSource<SubeventDto>(this.subeventsDto);
        this.loaderService.hide();
      })
  }

  openEventShow(eventDto: EventDto) {
    return this.router.navigate(['organizer', 'events', eventDto.id, 'sub-events']);
  }

  openSessionList(subeventDto: SubeventDto) {
    return this.router.navigate(['organizer', 'sub-events', subeventDto.id]);
  }
}

