import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { SessionCreateDto, SessionDto } from "../models/activity.model";
import { CancellationMessageCreateDto } from "../models/event.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseService{
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getEventSessions(eventId: string, activityId: string): Observable<SessionDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions`;
    return this.httpClient.get<SessionDto[]>(url, this.httpOptions);
  }

  getSubEventSessions(eventId: string, subeventId: string, activityId: string): Observable<SessionDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/sessions`;
    return this.httpClient.get<SessionDto[]>(url, this.httpOptions);
  }

  getEventSession(eventId: string, activityId: string, sessionId: string): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}`;
    return this.httpClient.get<SessionDto>(url, this.httpOptions);
  }

  getSubEventSession(eventId: string, subeventId: string, activityId: string, sessionId: string): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/sessions/${sessionId}`;
    return this.httpClient.get<SessionDto>(url, this.httpOptions);
  }

  postEventSession(eventId: string, activityId: string, sessionCreateDto: SessionCreateDto): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions`;
    return this.httpClient.post<SessionDto>(url, sessionCreateDto, this.httpOptions);
  }

  postSubEventSession(eventId: string, subeventId: string, activityId: string, sessionCreateDto: SessionCreateDto): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/sessions`;
    return this.httpClient.post<SessionDto>(url, sessionCreateDto, this.httpOptions);
  }

  putEventSession(eventId: string, activityId: string, sessionId: string, sessionCreateDto: SessionCreateDto): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}`;
    return this.httpClient.put<SessionDto>(url, sessionCreateDto, this.httpOptions);
  }

  putSubEventSession(eventId:string, subeventId: string, activityId: string, sessionId: string, sessionCreateDto: SessionCreateDto): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/sessions/${sessionId}`;
    return this.httpClient.put<SessionDto>(url, sessionCreateDto, this.httpOptions);
  }

  deleteEventSession(eventId: string, activityId: string, sessionId: string): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }

  deleteSubEventSession(eventId: string, subeventId: string, activityId: string, sessionId: string): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/sessions/${sessionId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }

  cancelEventSession(eventId: string, activityId: string, sessionId: string, cancellationMessageCreateDto: CancellationMessageCreateDto): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/cancel`;
    return this.httpClient.patch<SessionDto>(url, cancellationMessageCreateDto, this.httpOptions);
  }

  cancelSubEventSession(eventId: string, subeventId: string, activityId: string, sessionId: string, cancellationMessageCreateDto: CancellationMessageCreateDto): Observable<SessionDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/sessions/${sessionId}/cancel`;
    return this.httpClient.patch<SessionDto>(url, cancellationMessageCreateDto, this.httpOptions);
  }
}
