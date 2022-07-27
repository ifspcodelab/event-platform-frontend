import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventCreateDto, EventDto} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiUrl = `${environment.apiUrl}/events`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<EventDto[]> {
    return this.httpClient.get<EventDto[]>(this.apiUrl, this.httpOptions);
  }

  getEventById(eventId: string): Observable<EventDto> {
    return this.httpClient.get<EventDto>(`${this.apiUrl}/${eventId}`, this.httpOptions);
  }

  postEvent(eventCreateDto: EventCreateDto): Observable<EventDto> {
    return this.httpClient.post<EventDto>(this.apiUrl, eventCreateDto, this.httpOptions);
  }
}
