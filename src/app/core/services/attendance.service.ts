import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AttendanceCreateDto, AttendanceDto } from "../models/attendance.model";
import { EventDto } from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends BaseService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postEventAttendance(
    eventId: string,
    activityId: string,
    sessionId: string,
    sessionScheduleId: string,
    attendanceCreateDto: AttendanceCreateDto
  ): Observable<AttendanceDto> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/session-schedules/${sessionScheduleId}/attendances`;
    return this.httpClient.post<AttendanceDto>(url, attendanceCreateDto, this.httpOptions);
  }

  postSubEventAttendance(
    eventId: string,
    subEventId: string,
    activityId: string,
    sessionId: string,
    sessionScheduleId: string,
    attendanceCreateDto: AttendanceCreateDto
  ): Observable<AttendanceDto> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subEventId}/activities/${activityId}/sessions/${sessionId}/session-schedules/${sessionScheduleId}/attendances`;
    return this.httpClient.post<AttendanceDto>(url, attendanceCreateDto, this.httpOptions);
  }

  getEventAttendances(
    eventId: string,
    activityId: string,
    sessionId: string,
    sessionScheduleId: string
  ): Observable<AttendanceDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/session-schedules/${sessionScheduleId}/attendances`;
    return this.httpClient.get<AttendanceDto[]>(url, this.httpOptions);
  }

  getSubEventAttendances(
    eventId: string,
    subEventId: string,
    activityId: string,
    sessionId: string,
    sessionScheduleId: string
  ): Observable<AttendanceDto[]> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subEventId}/activities/${activityId}/sessions/${sessionId}/session-schedules/${sessionScheduleId}/attendances`;
    return this.httpClient.get<AttendanceDto[]>(url, this.httpOptions);
  }

  deleteEventAttendance(
    eventId: string,
    activityId: string,
    sessionId: string,
    sessionScheduleId: string,
    attendanceId: string
  ): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/session-schedules/${sessionScheduleId}/attendances/${attendanceId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }

  deleteSubEventAttendance(
    eventId: string,
    subEventId: string,
    activityId: string,
    sessionId: string,
    sessionScheduleId: string,
    attendanceId: string
  ): Observable<unknown> {
    const url = `${this.apiUrl}/events/${eventId}/sub-events/${subEventId}/activities/${activityId}/sessions/${sessionId}/session-schedules/${sessionScheduleId}/attendances/${attendanceId}`;
    return this.httpClient.delete<unknown>(url, this.httpOptions);
  }

  // postUserSessionRegistration(sessionId: string): Observable<RegistrationDto> {
  //   const url = `${this.apiUrl}/sessions/${sessionId}/registrations`;
  //   return this.httpClient.post<RegistrationDto>(url, this.httpOptions);
  // }
  //
  // postUserSessionRegistrationWaitList(sessionId: string): Observable<RegistrationDto> {
  //   const url = `${this.apiUrl}/sessions/${sessionId}/registrations/wait-list`;
  //   return this.httpClient.post<RegistrationDto>(url, this.httpOptions);
  // }
  //
  // getUserRegistrations(): Observable<RegistrationDto[]> {
  //   return this.httpClient.get<RegistrationDto[]>(`${this.apiUrl}/accounts/registrations`, this.httpOptions);
  // }
  //
  // getUserEvents(): Observable<AccountEventQueryDto[]> {
  //   return this.httpClient.get<AccountEventQueryDto[]>(`${this.apiUrl}/accounts/events`, this.httpOptions);
  // }
  //
  // cancelRegistration(registrationId: string): Observable<RegistrationDto> {
  //   const url = `${this.apiUrl}/accounts/registrations/${registrationId}/cancel`;
  //   return this.httpClient.patch<RegistrationDto>(url, this.httpOptions);
  // }
  //
  // acceptRegistration(registrationId: string): Observable<RegistrationDto> {
  //   const url = `${this.apiUrl}/accounts/registrations/${registrationId}/accept`;
  //   return this.httpClient.patch<RegistrationDto>(url, this.httpOptions);
  // }
  //
  // denyRegistration(registrationId: string): Observable<RegistrationDto> {
  //   const url = `${this.apiUrl}/accounts/registrations/${registrationId}/deny`;
  //   return this.httpClient.patch<RegistrationDto>(url, this.httpOptions);
  // }
  //
  // getEventRegistrations(eventId: string, activityId: string, sessionId: string): Observable<RegistrationDto[]> {
  //   const url = `${this.apiUrl}/events/${eventId}/activities/${activityId}/sessions/${sessionId}/registrations`;
  //   return this.httpClient.get<RegistrationDto[]>(url, this.httpOptions);
  // }
  //
  // getSubEventRegistrations(eventId: string, subEventId: string, activityId: string, sessionId: string): Observable<RegistrationDto[]> {
  //   const url = `${this.apiUrl}/events/${eventId}/sub-events/${subEventId}/activities/${activityId}/sessions/${sessionId}/registrations`;
  //   return this.httpClient.get<RegistrationDto[]>(url, this.httpOptions);
  // }
}
