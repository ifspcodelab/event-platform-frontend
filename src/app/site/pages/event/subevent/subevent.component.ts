import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";


@Component({
  selector: 'app-subevent',
  templateUrl: './subevent.component.html',
  styleUrls: ['./subevent.component.scss']
})
export class SubeventComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const subeventDtoResolved: SubeventDtoResolved = this.route.snapshot.data['subevent'];
    this.eventDto = subeventDtoResolved.eventDto;
    this.subeventDto = subeventDtoResolved.subeventDto;
    document.title = `${this.subeventDto.title} - ${this.eventDto.title}`;
  }
}
