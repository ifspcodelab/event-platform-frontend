import { Component, OnInit } from '@angular/core';
import {EventDto} from "../../../../core/models/event.model";
import {EventService} from "../../../../core/services/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.scss']
})
export class EventShowComponent implements OnInit {
  eventDto: EventDto;
  eventId: string;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');

    this.eventService.getEventById(this.eventId)
      .subscribe(
        eventDto => {
          this.eventDto = eventDto;
        }
      );
  }

}
