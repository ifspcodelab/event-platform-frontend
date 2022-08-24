import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventDto } from "../../../../core/models/event.model";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventDto: EventDto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventDto = this.route.snapshot.data['event'];
    document.title = this.eventDto.title;
  }
}
