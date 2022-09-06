import { Injectable } from "@angular/core";
import { BaseService } from "../../core/services/base.service";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventDto } from "../../core/models/event.model";
import { map } from "rxjs/operators";
import { SubeventDto } from "../../core/models/subevent.model";
import { OrganizerSiteDto } from "../../core/models/organizer.model";
import { SessionsGroupByDate } from "../../core/models/activity.model";
import { ActivityForSiteDto } from "../models/activity.model";

@Injectable({
  providedIn: 'root'
})
export class SiteService extends BaseService {
  apiUrl = `${environment.apiUrl}/for-site`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getEvents(): Observable<EventDto[]> {
    return this.httpClient.get<EventDto[]>(`${this.apiUrl}/events`, this.httpOptionsSkipInterceptor)
      .pipe(map(results => results.sort((a, b) => a.title.localeCompare(b.title))));
  }

  getEventBySlug(eventSlug: string): Observable<EventDto> {
    return this.httpClient.get<EventDto>(`${this.apiUrl}/events/${eventSlug}`, this.httpOptionsSkipInterceptor);
  }

  getSubevents(eventSlug: string): Observable<SubeventDto[]> {
    return this.httpClient.get<SubeventDto[]>(`${this.apiUrl}/events/${eventSlug}/sub-events`, this.httpOptionsSkipInterceptor);
  }

  getSubeventBySlug(eventSlug: string, subeventSlug: string): Observable<SubeventDto> {
    return this.httpClient.get<SubeventDto>(`${this.apiUrl}/events/${eventSlug}/sub-events/${subeventSlug}`, this.httpOptionsSkipInterceptor);
  }

  getOrganizers(eventId: string): Observable<OrganizerSiteDto[]> {
    return this.httpClient.get<OrganizerSiteDto[]>(`${this.apiUrl}/events/${eventId}/organizers`, this.httpOptionsSkipInterceptor);
  }

  getOrganizersSubevent(eventId: string, subeventId: string): Observable<OrganizerSiteDto[]> {
    return this.httpClient.get<OrganizerSiteDto[]>(`${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/organizers`, this.httpOptionsSkipInterceptor);
  }

  getEventActivities(eventId: string): Observable<SessionsGroupByDate[]> {
    return this.httpClient.get<SessionsGroupByDate[]>(`${this.apiUrl}/events/${eventId}/activities`, this.httpOptionsSkipInterceptor);
  }

  getSubEventActivities(eventId: string, subeventId: string): Observable<SessionsGroupByDate[]> {
    return this.httpClient.get<SessionsGroupByDate[]>(`${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities`, this.httpOptionsSkipInterceptor);
  }

  getEventActivity(eventId: string, activitySlug: string): Observable<ActivityForSiteDto> {
    return this.httpClient.get<ActivityForSiteDto>(`${this.apiUrl}/events/${eventId}/activities/${activitySlug}`, this.httpOptionsSkipInterceptor);
  }

  getSubEventActivity(eventId: string, subeventId: string, activitySlug: string): Observable<ActivityForSiteDto> {
    return this.httpClient.get<ActivityForSiteDto>(`${this.apiUrl}/events/${eventId}/sub-events/${subeventId}/activities/${activitySlug}`, this.httpOptionsSkipInterceptor);
  }
}
