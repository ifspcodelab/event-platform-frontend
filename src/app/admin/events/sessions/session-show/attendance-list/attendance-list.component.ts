import { Component, Input, OnInit } from '@angular/core';
import { RegistrationStatus } from "../../../../../core/models/registration.status";
import { SessionDto } from "../../../../../core/models/activity.model";
import { SpaceType } from "../../../../../core/models/spaceType.model";
import { RegistrationDto } from "../../../../../core/models/registration.model";
import { RegistrationService } from "../../../../../core/services/registration.service";
import { first } from "rxjs";

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  @Input()
  sessionId: string;
  displayedColumns: string[] = ['present', 'user', 'status'];
  checked = false;
  registrationsDto: RegistrationDto[] = [];

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

  fetchRegistrations() {
    this.registrationService.getEventRegistrations("", "", this.sessionId)
      .pipe(first())
      .subscribe({
        next: value => this.registrationsDto = value
      })
  }

  ngOnInit(): void {
    this.fetchRegistrations();
  }
}
