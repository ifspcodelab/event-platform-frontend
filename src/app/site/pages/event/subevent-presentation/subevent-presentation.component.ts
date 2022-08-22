import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";


@Component({
  selector: 'app-subevent-presentation',
  templateUrl: './subevent-presentation.component.html',
  styleUrls: ['./subevent-presentation.component.scss']
})
export class SubeventPresentationComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
    this.eventDto = subeventDtoResolved.eventDto;
    this.subeventDto = subeventDtoResolved.subeventDto;
    document.title = `${this.subeventDto.title} - ${this.eventDto.title}`;
  }
}
