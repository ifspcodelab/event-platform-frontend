import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventDto: EventDto;

  constructor() { }

  ngOnInit(): void {
  }

}
