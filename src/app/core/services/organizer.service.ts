import { OrganizerCreateDto, OrganizerSiteDto } from './../models/organizer.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrganizerDto } from '../models/organizer.model';
import { AccountDto } from '../models/account.model';
import { environment } from "../../../environments/environment";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class OrganizerService extends BaseService {
  apiUrl = `${environment.apiUrl}/events`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getOrganizers(eventId: string): Observable<OrganizerDto[]> {
    return this.httpClient.get<OrganizerDto[]>(`${this.apiUrl}/${eventId}/organizers`, this.httpOptions);
  }

  postOrganizer(eventId: string, accountId: string, organizerCreateDto: OrganizerCreateDto): Observable<OrganizerDto> {
    return this.httpClient.post<OrganizerDto>(`${this.apiUrl}/${eventId}/organizers`, organizerCreateDto, this.httpOptions);
  }

  deleteOrganizer(eventId: string, organizerId: string): Observable<unknown> {
    return this.httpClient.delete<OrganizerDto>(`${this.apiUrl}/${eventId}/organizers/${organizerId}`, this.httpOptions);
  }

  findByName(name: string): Observable<AccountDto[]> {
    return this.httpClient.get<AccountDto[]>(`${environment.apiUrl}/accounts/searchName/${name}`, this.httpOptions);
  }
}
