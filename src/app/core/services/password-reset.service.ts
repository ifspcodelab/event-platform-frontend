import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ForgotPasswordCreateDto} from "../models/forgot-password-create-dto.model";
import {PasswordResetDto} from "../models/password-reset-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private readonly API_FORGOT = "http://localhost:8080/api/v1/accounts/password/forgot";
  private readonly API_RESET = "http://localhost:8080/api/v1/accounts/password/reset";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  sendResetPasswordRequest(dto: ForgotPasswordCreateDto) {
    return this.httpClient.post<ForgotPasswordCreateDto>(this.API_FORGOT, dto, this.httpOptions);
  }

  sendPasswordAndToken(dto: PasswordResetDto) {
    return this.httpClient.post<PasswordResetDto>(this.API_RESET, dto, this.httpOptions);
  }
}


