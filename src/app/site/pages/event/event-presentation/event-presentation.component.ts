import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventDto} from "../../../../core/models/event.model";
import {first} from "rxjs";
import {SubeventService} from "../../../../core/services/subevent.service";
import {EventService} from "../../../../core/services/event.service";

@Component({
  selector: 'app-event-presentation',
  templateUrl: './event-presentation.component.html',
  styleUrls: ['./event-presentation.component.scss']
})
export class EventPresentationComponent implements OnInit {
  eventSlug: string;
  eventDto: EventDto;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.eventSlug = this.route.snapshot.paramMap.get('eventSlug');
    this.fetchEvent();

    document.getElementById("text")
      .innerHTML = this.eventDto.presentation;
  }

  fetchEvent() {
    this.eventService.getEventsBySlug(this.eventSlug)
      .pipe(first())
      .subscribe(
        eventsDto => {
          this.eventDto = eventsDto[0];
        }
      );
  }

}
