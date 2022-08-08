import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginCreateDto } from "../models/login.model";
import { Observable } from "rxjs";
import { JwtTokensDto } from "../models/jwt-tokens.model";
import { RefreshTokenRotateDto } from "../models/refresh-token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = `${environment.apiUrl}/accounts`;
  interceptorSkipHeader: string = 'Skip-Interceptor';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  postLogin(loginCreateDto: LoginCreateDto): Observable<JwtTokensDto> {
    const url = `${this.apiUrl}/login`;
    this.httpOptions.headers.set(this.interceptorSkipHeader, '');

    return this.httpClient.post<JwtTokensDto>(url, loginCreateDto, this.httpOptions);
  }

  deleteLogout(): Observable<unknown> {
    const url = `${this.apiUrl}/logout`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  postRefreshTokenRotation(refreshTokenDto: RefreshTokenRotateDto): Observable<JwtTokensDto> {
    const url = `${this.apiUrl}/refresh-token-rotation`;
    this.httpOptions.headers.set(this.interceptorSkipHeader, '');

    return this.httpClient.post<JwtTokensDto>(url, refreshTokenDto, this.httpOptions);
  }
}
