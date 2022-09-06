import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CancellationMessageCreateDto, EventCreateDto, EventDto } from "../models/event.model";
import { map } from "rxjs/operators";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService {
  apiUrl = `${environment.apiUrl}/events`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getEvents(): Observable<EventDto[]> {
    return this.httpClient.get<EventDto[]>(this.apiUrl, this.httpOptions);
  }

  getEventById(eventId: string): Observable<EventDto> {
    return this.httpClient.get<EventDto>(`${this.apiUrl}/${eventId}`, this.httpOptions);
  }

  postEvent(eventCreateDto: EventCreateDto): Observable<EventDto> {
    return this.httpClient.post<EventDto>(this.apiUrl, eventCreateDto, this.httpOptions);
  }

  putEvent(eventId: string, eventCreateDto: EventCreateDto): Observable<EventDto> {
    return this.httpClient.put<EventDto>(`${this.apiUrl}/${eventId}`, eventCreateDto, this.httpOptions);
  }

  deleteEvent(eventId: string): Observable<unknown> {
    return this.httpClient.delete<EventDto>(`${this.apiUrl}/${eventId}`, this.httpOptions);
  }

  publishEvent(eventId: string): Observable<EventDto> {
    return this.httpClient.patch<EventDto>(`${this.apiUrl}/${eventId}/publish`, this.httpOptions);
  }

  unpublishEvent(eventId: string): Observable<EventDto> {
    return this.httpClient.patch<EventDto>(`${this.apiUrl}/${eventId}/unpublish`, this.httpOptions);
  }

  cancelEvent(eventId: string, cancellationMessageCreateDto: CancellationMessageCreateDto): Observable<EventDto> {
    return this.httpClient.patch<EventDto>(`${this.apiUrl}/${eventId}/cancel`, cancellationMessageCreateDto, this.httpOptions);
  }
}
