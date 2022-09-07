import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegistrationCreateDto, RegistrationDto } from "../models/registration.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postUserSessionRegistration(sessionId: string): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/sessions/${sessionId}/registrations`;
    return this.httpClient.post<RegistrationDto>(url, this.httpOptions);
  }

  postUserSessionRegistrationWaitList(sessionId: string): Observable<RegistrationDto> {
    const url = `${this.apiUrl}/sessions/${sessionId}/registrations/wait-list`;
    return this.httpClient.post<RegistrationDto>(url, this.httpOptions);
  }

}
