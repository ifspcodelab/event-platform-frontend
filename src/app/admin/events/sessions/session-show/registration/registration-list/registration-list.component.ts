import { SessionDto } from './../../../../../../core/models/activity.model';
import { Component, Input, OnInit } from '@angular/core';
import { RegistrationStatus } from 'src/app/core/models/registration.status';
import { SpaceType } from 'src/app/core/models/spaceType.model';
import {RegistrationService} from "../../../../../../core/services/registration.service";
import {RegistrationDto} from "../../../../../../core/models/registration.model";
import {first} from "rxjs";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  @Input()
  sessionId: string;
  displayedColumns: string[] = ['user', 'status'];

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

  registrationsDto: RegistrationDto[] = [];

  constructor(private registrationService: RegistrationService ) { }

  ngOnInit(): void {
    this.fetchRegistrations();
  }

  fetchRegistrations() {
    this.registrationService.getEventRegistrations("", "", this.sessionId)
      .pipe(first())
      .subscribe({
        next: value => this.registrationsDto = value
      })
  }

}
