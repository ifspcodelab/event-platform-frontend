import { Component, OnInit } from '@angular/core';
import { EventStatusModel } from "../../../../core/models/event-status.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityDto, SessionDto } from "../../../../core/models/activity.model";
import { ActivityService } from "../../../../core/services/activity.service";
import { first } from "rxjs";

@Component({
  selector: 'app-activity-show',
  templateUrl: './activity-show.component.html',
  styleUrls: ['./activity-show.component.scss']
})
export class ActivityShowComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title'];
  eventMode: boolean = true;
  activityId: string;
  activityDto: ActivityDto;
  eventId: string = null;
  subeventId: string = null;
  sessionsDto: SessionDto[] = [];

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.activityId = this.route.snapshot.paramMap.get('activityId');

    if(this.subeventId) {
      this.eventMode = false;
      this.fetchSubEventActivity();
    } else {
      this.fetchEventActivity();
    }


  }

  fetchEventActivity() {
    this.activityService.getEventActivity(this.eventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.activityDto = activityDto;
        }
      })
  }

  fetchSubEventActivity() {
    this.activityService.getSubEventActivity(this.eventId, this.subeventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.activityDto = activityDto;
        }
      })
  }

  backLink() {
    if(this.eventMode) {
      return this.router.navigate(['admin', 'events', this.eventId], { queryParams: { tab: 2 } });
    } else {
      return this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId], { queryParams: { tab: 2 } });
    }

  }

  publishActivity() {

  }

  unpublishActivity() {

  }

  cancelActivity() {

  }

  openDeleteConfirmationDialog() {

  }

  openSessionShow(row: any) {
    console.log(this.subeventId)
    if (this.eventMode) {
      return this.router.navigate(
        ['admin', 'events',  this.eventId, 'activities', this.activityDto.id, 'sessions', row.id]
      );
    }
    return this.router.navigate(
      ['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', this.activityDto.id, 'sessions', row.id]
    );
  }

  showActions() {
    return this.activityDto.status !== EventStatusModel.CANCELED;
  }

  showPublishButton() {
    return this.activityDto.status == EventStatusModel.DRAFT;
  }

  showUnpublishedButton() {
    return this.activityDto.status == EventStatusModel.PUBLISHED;
  }

}
