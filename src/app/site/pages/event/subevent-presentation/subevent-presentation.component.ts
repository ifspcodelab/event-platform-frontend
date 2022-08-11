import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../../../core/services/event.service";
import { SubeventService } from "../../../../core/services/subevent.service";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { first } from "rxjs";
import { EventDto } from "../../../../core/models/event.model";

@Component({
  selector: 'app-subevent-presentation',
  templateUrl: './subevent-presentation.component.html',
  styleUrls: ['./subevent-presentation.component.scss']
})
export class SubeventPresentationComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;
  subeventSlug: string;
  eventSlug: string;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private subeventService: SubeventService
  ) { }

  ngOnInit(): void {
    this.eventSlug = this.route.parent.snapshot.paramMap.get('eventSlug');
    this.subeventSlug = this.route.parent.snapshot.paramMap.get('subeventSlug');
    this.fetchEvent();
  }

  fetchEvent() {
    this.eventService.getEventsBySlug(this.eventSlug)
      .pipe(first())
      .subscribe(
        eventsDto => {
          this.eventDto = eventsDto[0];
          this.fetchSubevent();
        }
      );
  }

  fetchSubevent() {
    this.subeventService.getSubeventBySlug(this.eventDto.id, this.subeventSlug)
      .pipe(first())
      .subscribe(
        subeventDto => {
          this.subeventDto = subeventDto[0];
        }
      )
  }
}
