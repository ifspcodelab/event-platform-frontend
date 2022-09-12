import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { EventDto } from "../models/event.model";
import { SubeventDto } from "../models/subevent.model";

@Injectable({
  providedIn: 'root'
})
export class OrganizerAreaService extends BaseService{
  apiUrl = `${environment.apiUrl}/organizers`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getEvents(): Observable<EventDto[]> {
    const url = `${this.apiUrl}/events`;
    return this.httpClient.get<EventDto[]>(url, this.httpOptions);
  }

  getSubevents(): Observable<SubeventDto[]> {
    const url = `${this.apiUrl}/subevents`;
    return this.httpClient.get<SubeventDto[]>(url, this.httpOptions);
  }
}
