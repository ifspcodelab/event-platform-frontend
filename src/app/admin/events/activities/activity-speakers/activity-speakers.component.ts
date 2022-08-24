import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { ActivitySpeakerService } from "../../../../core/services/activity-speaker.service";
import { ActivitySpeakerDto } from "../../../../core/models/activity-speaker.model";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../../../core/services/notification.service";
import { ActivitySpeakerFormComponent } from "../activity-speaker-form/activity-speaker-form.component";

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
    public dialog: MatDialog,
    private notificationService: NotificationService,
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

  private getDialogConfig() {
    return {
      autoFocus: true,
      width: '450px',
      data: { eventId: this.eventId, subeventId: this.subeventId, activityId: this.activityId }
    };
  }

  openActivitySpeakerFormDialog() {
    this.dialog.open(ActivitySpeakerFormComponent, this.getDialogConfig()).afterClosed()
      .subscribe(activitySpeakerDto => {
        if (activitySpeakerDto) {
          this.notificationService.success("Ministrante adicionado com sucesso");
          this.activitySpeakersDto = [...this.activitySpeakersDto, activitySpeakerDto];
          this.dataSource = new MatTableDataSource<ActivitySpeakerDto>(this.activitySpeakersDto);
        }
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
