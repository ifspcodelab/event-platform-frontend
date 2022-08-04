import { Component, OnInit } from '@angular/core';
import { EventService } from "../../../core/services/event.service";
import { EventDto } from "../../../core/models/event.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventsRegistrationDto: EventDto[];
  eventsExecutionDto: EventDto[];
  eventsFinishDto: EventDto[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe(events => {
        this.getEventsWithRegistrationPeriodStarted(events);
        this.getEventsWithExecutionPeriodStarted(events);
        this.getEventsWithExecutionPeriodFinished(events);
      });
  }

  getEventsWithRegistrationPeriodStarted(events: EventDto[]) {
    this.eventsRegistrationDto = events
      .filter(
        e => (new Date(e.registrationPeriod.startDate) <= new Date(Date.now())) &&
          (new Date(e.executionPeriod.endDate) >= new Date(Date.now()))
      );
  }

  getEventsWithExecutionPeriodStarted(events: EventDto[]) {
    this.eventsExecutionDto = events
      .filter(
        e => (new Date(e.executionPeriod.startDate) <= new Date(Date.now())) &&
          (new Date(e.executionPeriod.endDate) >= new Date(Date.now()))
      );
  }

  getEventsWithExecutionPeriodFinished(events: EventDto[]) {
    this.eventsFinishDto = events
      .filter(e => new Date(e.executionPeriod.endDate) < new Date(Date.now()))
  }
}
