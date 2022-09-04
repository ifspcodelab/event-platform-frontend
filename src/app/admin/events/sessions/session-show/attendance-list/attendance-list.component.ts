import {Component, Input, OnInit} from '@angular/core';
import {RegistrationStatus} from "../../../../../core/models/registration.status";
import {SessionDto} from "../../../../../core/models/activity.model";
import {SpaceType} from "../../../../../core/models/spaceType.model";
import {RegistrationDto} from "../../../../../core/models/registration.model";
import {RegistrationService} from "../../../../../core/services/registration.service";
import {first} from "rxjs";

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

  enrolledsDto: any[] = [
    {
      id: "459736c1-159f-4de5-82dd-db66bd9a9079",
      user: { id: "", name: "Carlos", email: "", cpf: "", agreed: "", role: "", verified: "true", registrationTimestamp: "" },
      status: RegistrationStatus.CONFIRMED,
    },
    {
      id: "459736c1-159f-4de5-82dd-db66bd9a9078",
      user: { id: "", name: "Daniel", email: "", cpf: "", agreed: "", role: "", verified: "true", registrationTimestamp: "" },
      status: RegistrationStatus.WAITING_LIST,
    }
  ]

  sessionDto: SessionDto = {
    id: "",
    title: "Sessão 1",
    seats: 8,
    schedulesSession: [
      {
        id: "",
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
