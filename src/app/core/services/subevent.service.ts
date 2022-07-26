import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventDto} from "../models/event.model";
import {SubeventDto} from "../models/subevent.model";

@Injectable({
  providedIn: 'root'
})
export class SubeventService {
  apiUrl = `${environment.apiUrl}/events`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getSubevents(eventId: string): Observable<SubeventDto[]> {
    return this.httpClient.get<SubeventDto[]>(`${this.apiUrl}/${eventId}/sub-events`, this.httpOptions);
  }

  getSubeventById(eventId: string, subeventId: string): Observable<SubeventDto> {
    return this.httpClient.get<SubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}`, this.httpOptions);
  }
}
