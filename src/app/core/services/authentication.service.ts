import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginDto } from "../models/login.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = `${environment.apiUrl}/accounts`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  postLogin(loginDto: LoginDto): Observable<LoginDto> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post<LoginDto>(url, loginDto, this.httpOptions);
  }
}
