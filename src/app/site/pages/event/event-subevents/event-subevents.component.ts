import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../../../core/services/event.service";
import { SubeventService } from "../../../../core/services/subevent.service";
import { first } from "rxjs";

@Component({
  selector: 'app-event-subevents',
  templateUrl: './event-subevents.component.html',
  styleUrls: ['./event-subevents.component.scss']
})
export class EventSubeventsComponent implements OnInit {
  eventDto: EventDto;
  subeventsDto: SubeventDto[];
  eventSlug: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private subeventService: SubeventService,
  ) { }

  ngOnInit(): void {
    this.eventSlug = this.route.parent.snapshot.paramMap.get('eventSlug');
    this.fetchEvent()
  }

  fetchEvent() {
    this.eventService.getEventsBySlug(this.eventSlug)
      .pipe(first())
      .subscribe(
        eventsDto => {
          this.eventDto = eventsDto[0];
          this.fetchSubevents(this.eventDto.id);
        }
      );
  }

  fetchSubevents(eventId: string) {
    this.subeventService.getSubevents(eventId)
      .subscribe(subevents => {
        this.subeventsDto = subevents;
      });
  }

}
