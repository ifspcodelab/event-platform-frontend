import {Component, Input, OnInit} from '@angular/core';
import { RegistrationDto } from "../../../../../core/models/registration.model";
import { RegistrationService } from "../../../../../core/services/registration.service";
import { AttendanceService} from "../../../../../core/services/attendance.service";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {AttendanceCreateDto} from "../../../../../core/models/attendance.model";

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
  attendanceCreateDto: AttendanceCreateDto;
  @Input()
  sessionScheduleId = "4b9c6dc7-a4c4-461b-9d92-3c7e16b360b0";
  registrationsDto: RegistrationDto[] = [];
  displayedColumns: string[] = ['present', 'user', 'status'];
  dataSource: MatTableDataSource<RegistrationDto>
  checked = false;

  constructor(
    private registrationService: RegistrationService,
    private attendanceService: AttendanceService,
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

  createAttendance()  {

    this.attendanceService.postAttendance(this.eventId, this.activityId, this.sessionId, "26060f89-0793-4b49-b25e-e9e7dfb02a68", this.attendanceCreateDto )
      .pipe(first())
      .subscribe( {

      });
  }

  // fetchEventActivitiesWithSubEvent() {
  //   this.activityService.getEventActivities(this.eventId)
  //     .subscribe(activities => {
  //       this.activitiesDto = activities
  //       this.dataSource = new MatTableDataSource<ActivityDto>(this.activitiesDto);
  //     });
  // }


}
