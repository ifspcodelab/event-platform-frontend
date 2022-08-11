import { OrganizerCreateDto } from './../models/organizer.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OrganizerDto } from '../models/organizer.model';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  apiUrl = `${environment.apiUrl}/events`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getOrganizers(eventId: string): Observable<OrganizerDto[]> {
    return this.httpClient.get<OrganizerDto[]>(`${this.apiUrl}/${eventId}/organizers`, this.httpOptions);
  }

  postOrganizer(eventId: string, accountId: string, organizerCreateDto: OrganizerCreateDto): Observable<OrganizerDto> {
    return this.httpClient.post<OrganizerDto>(`${this.apiUrl}/${eventId}/organizers`, organizerCreateDto, this.httpOptions);
  }

  deleteOrganizer(eventId: string, organizerId: string): Observable<unknown> {
    return this.httpClient.delete<OrganizerDto>(`${this.apiUrl}/${eventId}/organizers/${organizerId}`, this.httpOptions);
  }
}
