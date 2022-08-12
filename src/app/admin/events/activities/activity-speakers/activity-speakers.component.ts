import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivityDto } from "../../../../core/models/activity.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { ActivitySpeakerService } from "../../../../core/services/activity-speaker.service";
import { ActivitySpeakerDto } from "../../../../core/models/activity-speaker.model";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-activity-speakers',
  templateUrl: './activity-speakers.component.html',
  styleUrls: ['./activity-speakers.component.scss']
})
export class ActivitySpeakersComponent implements OnInit {
  @Input()
  eventId: string;
  @Input()
  subeventId: string;
  @Input()
  activityId: string;
  activitySpeakersDto: ActivitySpeakerDto[] = [];
  activitiesDisplayedColumns: string[] = ['name', 'email', 'phoneNumber'];
  dataSource: MatTableDataSource<ActivitySpeakerDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private activitySpeakerService: ActivitySpeakerService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    if(this.subeventId) {
      this.fetchSubEventActivitySpeakers();
    } else {
      this.fetchEventActivitySpeakers();
    }
  }

  fetchEventActivitySpeakers() {
    this.activitySpeakerService.getEventActivitySpeakers(this.eventId, this.activityId)
      .subscribe(activitySpeakersDto => {
        this.activitySpeakersDto = activitySpeakersDto
        this.dataSource = new MatTableDataSource<ActivitySpeakerDto>(this.activitySpeakersDto);
      });
  }

  fetchSubEventActivitySpeakers() {
    this.activitySpeakerService.getSubEventActivitySpeakers(this.eventId, this.subeventId, this.activityId)
      .subscribe(activitySpeakersDto => {
        this.activitySpeakersDto = activitySpeakersDto
        this.dataSource = new MatTableDataSource<ActivitySpeakerDto>(this.activitySpeakersDto);
      });
  }

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;
    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
    console.log(this.activitySpeakersDto)
  }

}
