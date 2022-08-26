import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { OrganizerSubeventCreateDto, OrganizerSubeventDto } from '../models/organizer-subevent.model';
import { AccountDto } from '../models/account.model';
import { BaseService } from "./base.service";
import { OrganizerSiteDto } from "../models/organizer.model";

@Injectable({
  providedIn: 'root'
})
export class OrganizerSubeventService extends BaseService {
  apiUrl = `${environment.apiUrl}/events`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getOrganizersSubevent(eventId: string, subeventId: string): Observable<OrganizerSubeventDto[]> {
    return this.httpClient.get<OrganizerSubeventDto[]>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/organizers`, this.httpOptions);
  }

  getOrganizersSubeventForSite(eventId: string, subeventId: string): Observable<OrganizerSiteDto[]> {
    return this.httpClient.get<OrganizerSiteDto[]>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/organizers/for-site`, this.httpOptionsSkipInterceptor);
  }

  postOrganizerSubevent(eventId: string, subeventId: string, accountId: string, organizerSubeventCreateDto: OrganizerSubeventCreateDto): Observable<OrganizerSubeventDto> {
    return this.httpClient.post<OrganizerSubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/organizers`, organizerSubeventCreateDto, this.httpOptions);
  }

  deleteOrganizerSubevent(eventId: string, subeventId: string, organizerId: string): Observable<unknown> {
    return this.httpClient.delete<OrganizerSubeventDto>(`${this.apiUrl}/${eventId}/sub-events/${subeventId}/organizers/${organizerId}`, this.httpOptions);
  }

  findByName(name: string): Observable<AccountDto[]> {
    const url = `${environment.apiUrl}/accounts/searchName/${name}`;
    return this.httpClient.get<AccountDto[]>(url, this.httpOptions);
  }
}
