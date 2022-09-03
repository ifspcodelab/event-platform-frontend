import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SiteService } from "../../../services/site.service";


@Component({
  selector: 'app-event-subevents',
  templateUrl: './event-subevents.component.html',
  styleUrls: ['./event-subevents.component.scss']
})
export class EventSubeventsComponent implements OnInit {
  eventDto: EventDto;
  subeventsDto: SubeventDto[];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
  ) { }

  ngOnInit(): void {
    this.eventDto = this.route.parent.snapshot.data['event'];
    this.fetchSubevents(this.eventDto.id);
  }

  fetchSubevents(eventId: string) {
    this.siteService.getSubevents(this.eventDto.slug)
      .subscribe(subevents => {
        this.subeventsDto = subevents;
        document.title = `${this.eventDto.title} - Subeventos`;
        this.loading = false;
      });
  }
}
