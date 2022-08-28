import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { ActivatedRoute } from "@angular/router";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";

@Component({
  selector: 'app-subevent-contact',
  templateUrl: './subevent-contact.component.html',
  styleUrls: ['./subevent-contact.component.scss']
})
export class SubeventContactComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
    this.eventDto = subeventDtoResolved.eventDto;
    this.subeventDto = subeventDtoResolved.subeventDto;
    document.title = `${this.eventDto.title} - ${this.subeventDto.title} - Contato`;
  }
}
