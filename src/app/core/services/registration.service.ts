import {Injectable} from '@angular/core';
import {RegistrationDto} from "../models/registration.model";
import {AccountRole} from "../models/account-role.model";
import {RegistrationStatus} from "../models/registration.status";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  fakeRegistrations: RegistrationDto[] = [
    {
      id: "e4e04cd5-2fe1-410d-9ea0-5a30fb2d8c20",
      date: "01-09-2022T10:00",
      account: {
        id: "e4e04cd5-2fe1-410d-9ea0-5a30fb2d8c20",
        name: "Isabella Valerio Mazará",
        email: "",
        cpf: "",
        agreed: true,
        allowEmail: true,
        role: AccountRole.ATTENDANT,
        verified: true,
        registrationTimestamp: "01-09-2022T10:00"
      },
      registrationStatus: RegistrationStatus.CONFIRMED,
      timeEmailWasSent: "01-09-2022T10:00"
    },
    {
      id: "e4e04cd5-2fe1-410d-9ea0-5a30fb2d8c20",
      date: "01-09-2022T10:00",
      account: {
        id: "e4e04cd5-2fe1-410d-9ea0-5a30fb2d8c20",
        name: "Ana Paula",
        email: "",
        cpf: "",
        agreed: true,
        allowEmail: true,
        role: AccountRole.ATTENDANT,
        verified: true,
        registrationTimestamp: "01-09-2022T10:00"
      },
      registrationStatus: RegistrationStatus.CONFIRMED,
      timeEmailWasSent: "01-09-2022T10:00"
    },
    {
      id: "e4e04cd5-2fe1-410d-9ea0-5a30fb2d8c20",
      date: "01-09-2022T10:00",
      account: {
        id: "e4e04cd5-2fe1-410d-9ea0-5a30fb2d8c20",
        name: "Latorre",
        email: "",
        cpf: "",
        agreed: true,
        allowEmail: true,
        role: AccountRole.ATTENDANT,
        verified: true,
        registrationTimestamp: "01-09-2022T10:00"
      },
      registrationStatus: RegistrationStatus.CONFIRMED,
      timeEmailWasSent: "01-09-2022T10:00"
    }
  ];

  getEventRegistrations(eventId: string, activityId: string, sessionId: string): Observable<RegistrationDto[]> {
    // const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}`;
    return of(this.fakeRegistrations);
  }

  getSubEventRegistrations(eventId: string, subeventId: string, activityId: string, sessionId: string): Observable<RegistrationDto[]> {
    // const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/sessions/${sessionId}`;
    return of(this.fakeRegistrations);
  }

  constructor() { }
}
