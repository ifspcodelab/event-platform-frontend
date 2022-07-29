import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { EventService } from "../../../../core/services/event.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  eventsDto: EventDto[] = [];

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe(events => this.eventsDto = events);
  }

  openEventShow(eventDto: EventDto) {
    return this.router.navigate(['admin', 'events', eventDto.id]);
  }
}
