import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AttendanceCreateDto, AttendanceDto} from "../models/attendance.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends BaseService{
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postAttendance(eventId: string, activityId: string, sessionId: string, scheduleSessionId: string, attendanceCreateDto: AttendanceCreateDto): Observable<AttendanceDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/sessions-schedules/${scheduleSessionId}/attendances`;
    return this.httpClient.post<AttendanceDto>(url, attendanceCreateDto, this.httpOptions);
  }
}
