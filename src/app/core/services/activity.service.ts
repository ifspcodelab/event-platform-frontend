import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { EventDto } from "../models/event.model";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivityDto, SessionScheduleDto } from "../models/activity.model";
import { EventStatusModel } from "../models/event-status.model";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  apiUrl = `${environment.apiUrl}/locations`;
  activities: ActivityDto[] = [
    {
      id: "68971c9d-17d5-4e48-a597-0e99d42c8327",
      title: "Novidades do Java 17",
      slug: "novidades-do-java-17",
      description: "",
      online: false,
      registrationRequired: true,
      status: EventStatusModel.PUBLISHED
    },
    {
      id: "68971c9d-17d5-4e48-a597-0e99d42c8327",
      title: "Novidades do Java 17",
      slug: "novidades-do-java-17",
      description: "",
      online: false,
      registrationRequired: true,
      status: EventStatusModel.PUBLISHED
    },
    {
      id: "68971c9d-17d5-4e48-a597-0e99d42c8327",
      title: "Novidades do Java 17",
      slug: "novidades-do-java-17",
      description: "",
      online: false,
      registrationRequired: true,
      status: EventStatusModel.PUBLISHED
    },
    {
      id: "68971c9d-17d5-4e48-a597-0e99d42c8327",
      title: "Novidades do Java 17",
      slug: "novidades-do-java-17",
      description: "",
      online: true,
      registrationRequired: true,
      status: EventStatusModel.PUBLISHED
    },

  ]

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getActivities(eventId: string): Observable<ActivityDto[]> {
    return of(this.activities);
  }

}
