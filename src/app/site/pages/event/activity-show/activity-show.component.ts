import { Component, OnInit } from '@angular/core';
import { ActivityDto } from "../../../../core/models/activity.model";
import { EventDto } from "../../../../core/models/event.model";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";
import { SubeventDto } from "../../../../core/models/subevent.model";

@Component({
  selector: 'app-activity-show',
  templateUrl: './activity-show.component.html',
  styleUrls: ['./activity-show.component.scss']
})
export class ActivityShowComponent implements OnInit {
  activitySlug: string;
  activity: ActivityDto;
  eventDto: EventDto;
  subeventDto: SubeventDto;
  eventMode: boolean = true;

  constructor(
    private route: ActivatedRoute
  ) {
    this.eventDto = this.route.parent.snapshot.data['event'];
    if(!this.eventDto) {
      this.eventMode = false;
      const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
      this.eventDto = subeventDtoResolved.eventDto;
      this.subeventDto = subeventDtoResolved.subeventDto;
    }

    this.activitySlug = this.route.snapshot.paramMap.get('activitySlug');
    console.log(this.eventMode);
    console.log(this.eventDto);
    console.log(this.subeventDto);
  }

  ngOnInit(): void {
  }

}
