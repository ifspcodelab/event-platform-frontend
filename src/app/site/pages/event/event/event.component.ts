import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../../../core/services/event.service";
import { first } from "rxjs";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventSlug: string;
  eventDto: EventDto;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.eventSlug = this.route.snapshot.paramMap.get('eventSlug');
    this.fetchEvent();

  }

  fetchEvent() {
    this.eventService.getEventsBySlug(this.eventSlug)
      .pipe(first())
      .subscribe(
        eventsDto => {
          this.eventDto = eventsDto[0];
          this.setTitle(this.eventDto.title);
        }
      );
  }

  setTitle(title: string) {
    document.title = title;
  }
}
