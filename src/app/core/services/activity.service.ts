import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivityCreateDto, ActivityDto, SessionScheduleDto } from "../models/activity.model";
import { EventStatusModel } from "../models/event-status.model";
import { EventCreateDto, EventDto } from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getEventActivities(eventId: string): Observable<ActivityDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/activities`;
    return this.httpClient.get<ActivityDto[]>(url, this.httpOptions);
  }

  getSubEventActivities(eventId: string, subeventId: string): Observable<ActivityDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities`;
    return this.httpClient.get<ActivityDto[]>(url, this.httpOptions);
  }

  getEventActivity(eventId: string, activityId: string): Observable<ActivityDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}`;
    return this.httpClient.get<ActivityDto>(url, this.httpOptions);
  }

  getSubEventActivity(eventId: string, subeventId: string, activityId: string): Observable<ActivityDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}`;
    return this.httpClient.get<ActivityDto>(url, this.httpOptions);
  }

  postEventActivity(eventId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities`;
    return this.httpClient.post<ActivityDto>(url, activityCreateDto, this.httpOptions);
  }

  postSubEventActivity(eventId: string, subeventId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities`;
    return this.httpClient.post<ActivityDto>(url, activityCreateDto, this.httpOptions);
  }

  putEventActivity(eventId: string, activityId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}`;
    return this.httpClient.put<ActivityDto>(url, activityCreateDto, this.httpOptions);
  }

  putSubEventActivity(eventId:string, subeventId: string, activityId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}`;
    return this.httpClient.put<ActivityDto>(url, activityCreateDto, this.httpOptions);
  }

  deleteEventActivity(eventId: string, activityId: string): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }

  deleteSubEventActivity(eventId: string, subeventId: string, activityId: string): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }
}
