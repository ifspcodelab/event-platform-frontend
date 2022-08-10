import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginCreateDto } from "../models/login.model";
import { Observable } from "rxjs";
import { JwtTokensDto } from "../models/jwt-tokens.model";
import { RefreshTokenRotateDto } from "../models/refresh-token.model";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postLogin(loginCreateDto: LoginCreateDto): Observable<JwtTokensDto> {
    const url = `${this.apiUrl}/login`;

    return this.httpClient.post<JwtTokensDto>(url, loginCreateDto, this.httpOptionsSkipInterceptor);
  }

  deleteLogout(): Observable<unknown> {
    const url = `${this.apiUrl}/logout`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  postRefreshTokenRotation(refreshTokenDto: RefreshTokenRotateDto): Observable<JwtTokensDto> {
    const url = `${this.apiUrl}/refresh-token-rotation`;

    return this.httpClient.post<JwtTokensDto>(url, refreshTokenDto, this.httpOptionsSkipInterceptor);
  }
}
