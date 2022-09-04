import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { ActivatedRoute } from "@angular/router";
import { SessionsGroupByDate } from "../../../../core/models/activity.model";
import { first } from "rxjs";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SiteService } from "../../../services/site.service";

@Component({
  selector: 'app-event-schedule',
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss']
})
export class EventScheduleComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;
  eventMode: boolean = true;
  sessionsGroupByDates: SessionsGroupByDate[] = [];
  groupActivities: any[] = [];
  Object = Object;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
    this.eventDto = this.route.parent.snapshot.data['event'];

    if(this.eventDto) {
      this.fetchEventActivities()
    } else {
      this.eventMode = false;
      const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
      this.eventDto = subeventDtoResolved.eventDto;
      this.subeventDto = subeventDtoResolved.subeventDto;
      this.fetchSubEventActivities()
    }
  }


  fetchEventActivities() {
    this.siteService.getEventActivities(this.eventDto.id)
      .pipe(
        first()
      )
      .subscribe(sessionsGroupByDates => {
        this.sessionsGroupByDates = sessionsGroupByDates;
        document.title = `${this.eventDto.title} - Programação`;
        this.loading = false;
      });
  }

  fetchSubEventActivities() {
    this.siteService.getSubEventActivities(this.eventDto.id, this.subeventDto.id)
      .pipe(
        first()
      )
      .subscribe(sessionsGroupByDates => {
        this.sessionsGroupByDates = sessionsGroupByDates;
        document.title = `${this.eventDto.title} - ${this.subeventDto.title} - Programação`;
        this.loading = false;
      });
  }

  getSpeakerNames(speakers: string[]) {
    return speakers.reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ' e ') + value);
  }
}
