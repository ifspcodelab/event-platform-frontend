import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { EventDto } from "../models/event.model";
import { SubeventDto } from "../models/subevent.model";
import { SessionDto } from "../models/activity.model";
import { SessionsGroupByDate } from "../models/activity.model";

@Injectable({
  providedIn: 'root'
})
export class OrganizerAreaService extends BaseService{
  apiUrl = `${environment.apiUrl}/organizers`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getEvents(): Observable<EventDto[]> {
    const url = `${this.apiUrl}/events`;
    return this.httpClient.get<EventDto[]>(url, this.httpOptions);
  }

  getSubevents(): Observable<SubeventDto[]> {
    const url = `${this.apiUrl}/sub-events`;
    return this.httpClient.get<SubeventDto[]>(url, this.httpOptions);
  }

  getEventSessions(eventId: string): Observable<SessionDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/sessions`;
    return this.httpClient.get<SessionDto[]>(url, this.httpOptions);
  }

  getSubeventSessions(subeventId: string): Observable<SessionDto[]> {
    const url = `${this.apiUrl}/sub-events/${subeventId}/sessions`;
    return this.httpClient.get<SessionDto[]>(url, this.httpOptions);
  }

  getEventSession(eventId: string, sessionId: string): Observable<SessionDto> {
    const url = `${this.apiUrl}/sub-events/${eventId}/sessions/${sessionId}`;
    return this.httpClient.get<SessionDto>(url, this.httpOptions);
  }

  getSubeventSession(subeventId: string, sessionId: string): Observable<SessionDto> {
    const url = `${this.apiUrl}/sub-events/${subeventId}/sessions/${sessionId}`;
    return this.httpClient.get<SessionDto>(url, this.httpOptions);
  }
}
