import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../../../core/services/event.service";
import { first } from "rxjs";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SubeventService } from "../../../../core/services/subevent.service";

@Component({
  selector: 'app-subevent',
  templateUrl: './subevent.component.html',
  styleUrls: ['./subevent.component.scss']
})
export class SubeventComponent implements OnInit {
  eventSlug: string;
  subeventSlug: string;
  eventDto: EventDto;
  subeventDto: SubeventDto;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private subeventService: SubeventService,
  ) { }

  ngOnInit(): void {
    this.eventSlug = this.route.snapshot.paramMap.get('eventSlug');
    this.subeventSlug = this.route.snapshot.paramMap.get('subeventSlug');
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
          this.setTitle(`${this.subeventDto.title} - ${this.eventDto.title}`);
        }
      )
  }

  setTitle(title: string) {
    document.title = title;
  }
}
