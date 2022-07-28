import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { EventService } from "../../../../core/services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SubeventService } from "../../../../core/services/subevent.service";

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.scss']
})
export class EventShowComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  dataSource: SubeventDto[] = [];
  eventDto: EventDto;
  eventId: string;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private subeventService: SubeventService
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');

    this.fetchEvent(this.eventId);
  }

  fetchEvent(eventId: string) {
    this.eventService.getEventById(eventId)
      .pipe(first())
      .subscribe(
        eventDto => {
          this.eventDto = eventDto;
          this.fetchSubevents(this.eventId);
        }
      );
  }

  fetchSubevents(eventId: string) {
    this.subeventService.getSubevents(eventId)
      .subscribe(
      subevents => {
        this.dataSource = subevents;
        console.log(subevents);
      }
    )
  }

  openSubeventShow(subeventDto: SubeventDto) {
    return this.router.navigate(['admin', 'events', this.eventDto.id, 'sub-events', subeventDto.id]);
  }

}
