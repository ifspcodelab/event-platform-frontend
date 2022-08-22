import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventDto } from "../../../../core/models/event.model";


@Component({
  selector: 'app-event-presentation',
  templateUrl: './event-presentation.component.html',
  styleUrls: ['./event-presentation.component.scss']
})
@Injectable({
  providedIn: "root"
})
export class EventPresentationComponent implements OnInit {
  eventDto: EventDto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventDto = this.route.parent.snapshot.data['event'];
    document.title = this.eventDto.title;
  }
}
