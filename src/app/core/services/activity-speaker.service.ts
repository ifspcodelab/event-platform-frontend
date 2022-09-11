import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivitySpeakerCreateDto, ActivitySpeakerDto } from "../models/activity-speaker.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class ActivitySpeakerService extends BaseService{
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getEventActivitySpeakers(eventId: string, activityId: string): Observable<ActivitySpeakerDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/speakers`;
    return this.httpClient.get<ActivitySpeakerDto[]>(url, this.httpOptions);
  }

  getSubEventActivitySpeakers(eventId: string, subeventId: string, activityId: string): Observable<ActivitySpeakerDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/speakers`;
    return this.httpClient.get<ActivitySpeakerDto[]>(url, this.httpOptions);
  }

  postEventActivitySpeakers(
    eventId: string,
    activityId: string,
    activitySpeakerCreateDto: ActivitySpeakerCreateDto
  ): Observable<ActivitySpeakerDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/speakers`;
    return this.httpClient.post<ActivitySpeakerDto>(url, activitySpeakerCreateDto, this.httpOptions);
  }

  postSubEventActivitySpeakers(
    eventId: string,
    subeventId: string,
    activityId: string,
    activitySpeakerCreateDto: ActivitySpeakerCreateDto
  ): Observable<ActivitySpeakerDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/speakers`;
    return this.httpClient.post<ActivitySpeakerDto>(url, activitySpeakerCreateDto, this.httpOptions);
  }

  deleteEventActivitySpeaker(eventId: string, activityId: string, activitySpeakerId: string): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/speakers/${activitySpeakerId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }

  deleteSubEventActivitySpeaker(eventId: string, subeventId: string, activityId: string, activitySpeakerId: string): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/speakers/${activitySpeakerId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }
}
