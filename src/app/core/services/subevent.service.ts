import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubeventCreateDto, SubeventDto} from "../models/subevent.model";

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

  postSubevent(eventId: string, subeventCreateDto: SubeventCreateDto): Observable<SubeventDto> {
    return this.httpClient.post<SubeventDto>(`${this.apiUrl}/${eventId}/sub-events`, subeventCreateDto, this.httpOptions);
  }

  putSubevent(eventId: string, subeventCreateDto: SubeventCreateDto, subeventId: string): Observable<SubeventDto> {
    return this.httpClient.put<SubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}`, subeventCreateDto, this.httpOptions);
  }

  deleteSubevent(eventId: string, subeventId: string): Observable<unknown> {
    return this.httpClient.delete<SubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}`, this.httpOptions);
  }

  publishSubevent(eventId: string, subeventId: string): Observable<SubeventDto> {
    return this.httpClient.patch<SubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/publish`, this.httpOptions);
  }
}
