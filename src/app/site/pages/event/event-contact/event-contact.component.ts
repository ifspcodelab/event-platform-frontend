import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-event-contact',
  templateUrl: './event-contact.component.html',
  styleUrls: ['./event-contact.component.scss']
})
export class EventContactComponent implements OnInit {

  eventDto: EventDto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventDto = this.route.parent.snapshot.data['event'];
    document.title = this.eventDto.title;
  }
}
