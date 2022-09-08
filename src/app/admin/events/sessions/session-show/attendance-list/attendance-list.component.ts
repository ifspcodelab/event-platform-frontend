import { Component, Input, OnInit } from '@angular/core';
import { RegistrationStatus } from "../../../../../core/models/registration.status";
import {ActivityDto, SessionDto} from "../../../../../core/models/activity.model";
import { SpaceType } from "../../../../../core/models/spaceType.model";
import { RegistrationDto } from "../../../../../core/models/registration.model";
import { RegistrationService } from "../../../../../core/services/registration.service";
import { first } from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  @Input()
  eventId: string;
  @Input()
  subeventId: string;
  @Input()
  activityId: string;
  @Input()
  sessionId: string;
  registrationsDto: RegistrationDto[] = [];
  displayedColumns: string[] = ['present', 'user', 'status'];
  dataSource: MatTableDataSource<RegistrationDto>
  checked = false;



  sessionDto: SessionDto = {
    id: "",
    title: "Sessão 1",
    seats: 8,
    schedulesSession: [
      {
        id: "6bc14c1f-1677-4960-b88c-a2bd445b60d5",
        start: "21/09/2022 09:00",
        end: "21/09/2022 11:00",
        location: { id: "", name: "IFSP Campus São Paulo", address: "" },
        area: { id: "", name: "Bloco C", reference: null },
        space: { id: "", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
      }
    ]
  }

  schedulesSessionId = this.sessionDto.schedulesSession.map((obj) => obj.id);
  locationName = this.sessionDto.schedulesSession.map((obj) => obj.location.name);
  areaName = this.sessionDto.schedulesSession.map((obj) => obj.area.name);
  spaceName = this.sessionDto.schedulesSession.map((obj) => obj.space.name);

  constructor(private registrationService: RegistrationService) { }

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

  ngOnInit(): void {
    this.fetchEventRegistrations();
  }
}
