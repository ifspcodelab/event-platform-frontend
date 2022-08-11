import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { EventDto } from "../../../../core/models/event.model";
import { first } from "rxjs";
import { EventService } from "../../../../core/services/event.service";

@Component({
  selector: 'app-event-presentation',
  templateUrl: './event-presentation.component.html',
  styleUrls: ['./event-presentation.component.scss']
})
@Injectable({
  providedIn: "root"
})
export class EventPresentationComponent implements OnInit {
  eventSlug: string;
  eventDto: EventDto;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.eventSlug = this.route.parent.snapshot.paramMap.get('eventSlug');
    this.fetchEvent();
  }

  fetchEvent() {
    this.eventService.getEventsBySlug(this.eventSlug)
      .pipe(first())
      .subscribe(
        eventsDto => {
          this.eventDto = eventsDto[0];
          // document.getElementById("text")
          //   .innerHTML = this.eventDto.presentation;
        }
      );
  }
}
