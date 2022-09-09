import {Component, Input, OnInit} from '@angular/core';
import { RegistrationDto } from "../../../../../core/models/registration.model";
import { RegistrationService } from "../../../../../core/services/registration.service";
import {MatTableDataSource} from "@angular/material/table";
import {SessionDto} from "../../../../../core/models/activity.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  eventId: string = null;
  subeventId: string = null;
  activityId: string;
  sessionId: string;
  sessionDto: SessionDto = null;
  registrationsDto: RegistrationDto[] = [];
  displayedColumns: string[] = ['present', 'user', 'status'];
  dataSource: MatTableDataSource<RegistrationDto>
  checked = false;

  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.activityId = this.route.snapshot.paramMap.get('activityId');
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.fetchEventRegistrations();
  }

  fetchEventRegistrations() {
    this.registrationService.getEventRegistrations(this.eventId, this.activityId, this.sessionId)
      .subscribe(registrations => {
        this.registrationsDto = registrations
        this.dataSource = new MatTableDataSource<RegistrationDto>(this.registrationsDto);
      })
  }

  // fetchEventActivitiesWithSubEvent() {
  //   this.activityService.getEventActivities(this.eventId)
  //     .subscribe(activities => {
  //       this.activitiesDto = activities
  //       this.dataSource = new MatTableDataSource<ActivityDto>(this.activitiesDto);
  //     });
  // }


}
