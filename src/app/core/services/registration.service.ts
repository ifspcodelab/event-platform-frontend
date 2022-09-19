import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountEventQueryDto, RegistrationCreateDto, RegistrationDto } from "../models/registration.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postEventRegistrations(eventId: string, activityId: string, sessionId: string, registrationCreateDto: RegistrationCreateDto): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/registrations`;
    return this.httpClient.post<RegistrationDto>(url, registrationCreateDto, this.httpOptions);
  }

  postSubEventRegistrations(eventId: string, subEventId: string, activityId: string, sessionId: string, registrationCreateDto: RegistrationCreateDto): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subEventId}/activities/${activityId}/sessions/${sessionId}/registrations`;
    return this.httpClient.post<RegistrationDto>(url, registrationCreateDto, this.httpOptions);
  }

  postUserSessionRegistration(sessionId: string): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/sessions/${sessionId}/registrations`;
    return this.httpClient.post<RegistrationDto>(url, this.httpOptions);
  }

  postUserSessionRegistrationWaitList(sessionId: string): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/sessions/${sessionId}/registrations/wait-list`;
    return this.httpClient.post<RegistrationDto>(url, this.httpOptions);
  }

  getUserRegistrations(): Observable<RegistrationDto[]> {
    return this.httpClient.get<RegistrationDto[]>(`${this.apiUrl}/accounts/registrations`, this.httpOptions);
  }

  getUserEvents(): Observable<AccountEventQueryDto[]> {
    return this.httpClient.get<AccountEventQueryDto[]>(`${this.apiUrl}/accounts/events`, this.httpOptions);
  }

  cancelRegistration(registrationId: string): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/accounts/registrations/${registrationId}/cancel`;
    return this.httpClient.patch<RegistrationDto>(url, this.httpOptions);
  }

  acceptRegistration(registrationId: string): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/accounts/registrations/${registrationId}/accept`;
    return this.httpClient.patch<RegistrationDto>(url, this.httpOptions);
  }

  denyRegistration(registrationId: string): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/accounts/registrations/${registrationId}/deny`;
    return this.httpClient.patch<RegistrationDto>(url, this.httpOptions);
  }

  getEventRegistrations(eventId: string, activityId: string, sessionId: string): Observable<RegistrationDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/registrations`;
    return this.httpClient.get<RegistrationDto[]>(url, this.httpOptions);
  }

  getSubEventRegistrations(eventId: string, subEventId: string, activityId: string, sessionId: string): Observable<RegistrationDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subEventId}/activities/${activityId}/sessions/${sessionId}/registrations`;
    return this.httpClient.get<RegistrationDto[]>(url, this.httpOptions);
  }
}
