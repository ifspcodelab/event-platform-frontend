import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { ActivatedRoute } from "@angular/router";
import { ActivitySiteDto } from "../../../../core/models/activity.model";
import { ActivityService } from "../../../../core/services/activity.service";
import { first } from "rxjs";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";
import { SubeventDto } from "../../../../core/models/subevent.model";

@Component({
  selector: 'app-event-schedule',
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss']
})
export class EventScheduleComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;
  eventMode: boolean = true;
  activities: ActivitySiteDto[] = [];
  groupActivities: any[] = [];
  Object = Object;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.eventDto = this.route.parent.snapshot.data['event'];

    if(this.eventDto) {
      document.title = `${this.eventDto.title} - Programação`;
      this.fetchEventActivities()
    } else {
      this.eventMode = false;
      const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
      this.eventDto = subeventDtoResolved.eventDto;
      this.subeventDto = subeventDtoResolved.subeventDto;
      document.title = `${this.subeventDto.title} - Programação`;
      this.fetchSubEventActivities()
    }
  }


  fetchEventActivities() {
    this.activityService.getEventActivitiesForSite(this.eventDto.id)
      .pipe(
        first()
      )
      .subscribe(activities => {
        this.activities = activities;
        this.groupActivities = this.groupActivitiesReduce(activities);
      });
  }

  fetchSubEventActivities() {
    this.activityService.getSubEventActivitiesForSite(this.eventDto.id, this.subeventDto.id)
      .pipe(
        first()
      )
      .subscribe(activities => {
        this.activities = activities;
        this.groupActivities = this.groupActivitiesReduce(activities);
      });
  }

  groupActivitiesReduce(activities: ActivitySiteDto[]): any[] {
    return activities.reduce((acc: any, item) => {
      acc[item.sessionScheduleExecutionStartDate] = acc[item.sessionScheduleExecutionStartDate] || [];
      acc[item.sessionScheduleExecutionStartDate][item.activityTitle] = acc[item.sessionScheduleExecutionStartDate][item.activityTitle] || [];

      const isExist = acc[item.sessionScheduleExecutionStartDate][item.activityTitle]
        .find((s: ActivitySiteDto) => s.sessionTitle === item.sessionTitle);

      if(!isExist) {
        acc[item.sessionScheduleExecutionStartDate][item.activityTitle].push(item);
      }

      return acc;
    }, {});
  }
}
