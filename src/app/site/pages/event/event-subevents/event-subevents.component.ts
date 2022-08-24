import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SubeventService } from "../../../../core/services/subevent.service";
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDto } from "../../../../core/models/subevent.model";


@Component({
  selector: 'app-event-subevents',
  templateUrl: './event-subevents.component.html',
  styleUrls: ['./event-subevents.component.scss']
})
export class EventSubeventsComponent implements OnInit {
  eventDto: EventDto;
  subeventsDto: SubeventDto[];

  constructor(
    private route: ActivatedRoute,
    private subeventService: SubeventService,
  ) { }

  ngOnInit(): void {
    this.eventDto = this.route.parent.snapshot.data['event'];
    this.fetchSubevents(this.eventDto.id);
  }

  fetchSubevents(eventId: string) {
    this.subeventService.getSubevents(eventId)
      .subscribe(subevents => {
        this.subeventsDto = subevents;
        document.title = `${this.eventDto.title} - Subeventos`;
      });
  }
}
