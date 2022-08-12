import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivitySpeakerDto } from "../models/activity-speaker.model";

@Injectable({
  providedIn: 'root'
})
export class ActivitySpeakerService {
  apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getEventActivitySpeakers(eventId: string, activityId: string): Observable<ActivitySpeakerDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/speakers`;
    return this.httpClient.get<ActivitySpeakerDto[]>(url, this.httpOptions);
  }

  getSubEventActivitySpeakers(eventId: string, subeventId: string, activityId: string): Observable<ActivitySpeakerDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/speakers`;
    return this.httpClient.get<ActivitySpeakerDto[]>(url, this.httpOptions);
  }

  // getSubEventActivities(eventId: string, subeventId: string): Observable<ActivityDto[]> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities`;
  //   return this.httpClient.get<ActivityDto[]>(url, this.httpOptions);
  // }
  //
  // getEventActivity(eventId: string, activityId: string): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}`;
  //   return this.httpClient.get<ActivityDto>(url, this.httpOptions);
  // }
  //
  // getSubEventActivity(eventId: string, subeventId: string, activityId: string): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}`;
  //   return this.httpClient.get<ActivityDto>(url, this.httpOptions);
  // }
  //
  // postEventActivity(eventId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities`;
  //   return this.httpClient.post<ActivityDto>(url, activityCreateDto, this.httpOptions);
  // }
  //
  // postSubEventActivity(eventId: string, subeventId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities`;
  //   return this.httpClient.post<ActivityDto>(url, activityCreateDto, this.httpOptions);
  // }
  //
  // putEventActivity(eventId: string, activityId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}`;
  //   return this.httpClient.put<ActivityDto>(url, activityCreateDto, this.httpOptions);
  // }
  //
  // putSubEventActivity(eventId:string, subeventId: string, activityId: string, activityCreateDto: ActivityCreateDto): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}`;
  //   return this.httpClient.put<ActivityDto>(url, activityCreateDto, this.httpOptions);
  // }
  //
  // deleteEventActivity(eventId: string, activityId: string): Observable<unknown> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}`;
  //   return this.httpClient.delete<unknown>(url, this.httpOptions);
  // }
  //
  // deleteSubEventActivity(eventId: string, subeventId: string, activityId: string): Observable<unknown> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}`;
  //   return this.httpClient.delete<unknown>(url, this.httpOptions);
  // }
  //
  // publishEventActivity(eventId: string, activityId: String): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/publish`;
  //   return this.httpClient.patch<ActivityDto>(url, this.httpOptions);
  // }
  //
  // publishSubEventActivity(eventId: string, subeventId: String, activityId: String): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/publish`;
  //   return this.httpClient.patch<ActivityDto>(url, this.httpOptions);
  // }
  //
  // unpublishEventActivity(eventId: string, activityId: String): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/unpublish`;
  //   return this.httpClient.patch<ActivityDto>(url, this.httpOptions);
  // }
  //
  // unpublishSubEventActivity(eventId: string, subeventId: String, activityId: String): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/unpublish`;
  //   return this.httpClient.patch<ActivityDto>(url, this.httpOptions);
  // }
  //
  // cancelEventActivity(eventId: string, activityId: String, cancellationMessageCreateDto: CancellationMessageCreateDto): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/cancel`;
  //   return this.httpClient.patch<ActivityDto>(url, cancellationMessageCreateDto, this.httpOptions);
  // }
  //
  // cancelSubEventActivity(eventId: string, subeventId: String, activityId: String, cancellationMessageCreateDto: CancellationMessageCreateDto): Observable<ActivityDto> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activityId}/cancel`;
  //   return this.httpClient.patch<ActivityDto>(url, cancellationMessageCreateDto, this.httpOptions);
  // }


}
