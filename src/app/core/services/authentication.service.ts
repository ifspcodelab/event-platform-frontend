import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginDto } from "../models/login.model";
import { Observable } from "rxjs";
import { JwtTokensDto } from "../models/jwt-tokens.model";
import { RefreshTokenRotateDto } from "../models/refresh-token.model";

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

  postLogin(loginDto: LoginDto): Observable<JwtTokensDto> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post<JwtTokensDto>(url, loginDto, this.httpOptions);
  }

  deleteLogout() {
    const url = `${this.apiUrl}/logout`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  postRefreshTokenRotation(refreshTokenDto: RefreshTokenRotateDto): Observable<JwtTokensDto> {
    const url = `${this.apiUrl}/refresh-token-rotation`;
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR',
      'Skip-Interceptor': ''
    });

    return this.httpClient.post<JwtTokensDto>(url, refreshTokenDto, this.httpOptions);
  }
}
