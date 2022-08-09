import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivityDto } from "../../../../core/models/activity.model";
import { ActivityService } from "../../../../core/services/activity.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  @Input()
  eventId: string;
  @Input()
  subeventId: string;
  activitiesDto: ActivityDto[] = [];
  activitiesDisplayedColumns: string[] = ['title', 'type', 'online', 'registrationRequired', 'status'];
  dataSource: MatTableDataSource<ActivityDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    if(this.subeventId) {
      this.fetchSubEventActivities();
    } else {
      this.fetchEventActivities();
    }
  }

  fetchEventActivities() {
    this.activityService.getEventActivities(this.eventId)
      .subscribe(activities => {
        this.activitiesDto = activities
        this.dataSource = new MatTableDataSource<ActivityDto>(this.activitiesDto);
      });
  }

  fetchSubEventActivities() {
    this.activityService.getSubEventActivities(this.eventId, this.subeventId)
      .subscribe(activitiesDto => {
        this.activitiesDto = activitiesDto
        this.dataSource = new MatTableDataSource<ActivityDto>(this.activitiesDto);
      });
  }

  openActivityShow(activityDto: ActivityDto) {
    if(this.subeventId) {
      return this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', activityDto.id]);
    } else {
      return this.router.navigate(['admin', 'events', this.eventId, 'activities', activityDto.id]);
    }
  }

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;
    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
  }
}
