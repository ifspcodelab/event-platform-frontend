import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../core/services/event.service";
import {EventDto} from "../../../core/models/event.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventsRegistrationDto: EventDto[] = [];
  eventsExecutionDto: EventDto[] = [];
  eventsFinishDto: EventDto[] = [];
  eventsDtoPublished: EventDto[] = [];
  futureEvents: EventDto[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe(events => {
        this.getEventsPublished(events);
      });
  }

  getEventsPublished(events: EventDto[]) {
    this.eventsDtoPublished = events.filter(e => e.status.toString() === "PUBLISHED");
    this.getEventsWithRegistrationPeriodStarted();
    this.getEventsWithExecutionPeriodStarted();
    this.getEventsWithExecutionPeriodFinished();
    this.getFuturesEvents();
  }

  getEventsWithRegistrationPeriodStarted() {
    this.eventsRegistrationDto = this.eventsDtoPublished
      .filter(
        e => (this.formatDate(e.registrationPeriod.startDate) <= this.getCurrentDate()) &&
          (this.formatDate(e.executionPeriod.endDate) >= this.getCurrentDate())
      );
  }

  getEventsWithExecutionPeriodStarted() {
    this.eventsExecutionDto = this.eventsDtoPublished
      .filter(
        e => (this.formatDate(e.executionPeriod.startDate) <= this.getCurrentDate()) &&
          (this.formatDate(e.executionPeriod.endDate) >= this.getCurrentDate())
      );
  }

  getEventsWithExecutionPeriodFinished() {
    this.eventsFinishDto = this.eventsDtoPublished
      .filter(e => this.formatDate(e.executionPeriod.endDate) < this.getCurrentDate());
  }

  getFuturesEvents() {
    this.futureEvents = this.eventsDtoPublished
      .filter(e => this.formatDate(e.registrationPeriod.startDate) > this.getCurrentDate());
  }

  formatDate(date: string): Date {
    const datetest = date.replace('-','/').replace('-', '/');

    return new Date(datetest);
  }

  getCurrentDate() : Date {
    let date = new Date(Date.now())
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

}
