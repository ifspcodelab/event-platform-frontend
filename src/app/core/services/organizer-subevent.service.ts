import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { OrganizerSubeventCreateDto, OrganizerSubeventDto } from '../models/organizer-subevent.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizerSubeventService {
  apiUrl = `${environment.apiUrl}/events`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getOrganizersSubevent(eventId: string, subeventId: string): Observable<OrganizerSubeventDto[]> {
    return this.httpClient.get<OrganizerSubeventDto[]>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/organizers`, this.httpOptions);
  }

  postOrganizerSubevent(eventId: string, subeventId: string, accountId: string, organizerSubeventCreateDto: OrganizerSubeventCreateDto): Observable<OrganizerSubeventDto> {
    return this.httpClient.post<OrganizerSubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/organizers`, organizerSubeventCreateDto, this.httpOptions);
  }

  deleteOrganizerSubevent(eventId: string, subeventId: string, organizerId: string): Observable<unknown> {
    return this.httpClient.delete<OrganizerSubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/organizers/${organizerId}`, this.httpOptions);
  }
}
