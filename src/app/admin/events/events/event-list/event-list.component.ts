import {Component, OnInit} from '@angular/core';
import {EventDto} from "../../../../core/models/event.model";
import {EventService} from "../../../../core/services/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  dataSource: EventDto[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {

    this.eventService.getEvents().subscribe(
      events => {
        this.dataSource = events;
      }
    )
  }

}
