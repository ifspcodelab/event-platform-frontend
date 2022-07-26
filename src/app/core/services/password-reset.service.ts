import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ForgotPasswordCreateDto} from "../models/forgot-password-create-dto.model";
import {PasswordResetDto} from "../models/password-reset-dto";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private readonly API_FORGOT = "api/v1/accounts/password/forgot";
  private readonly API_RESET = "api/v1/accounts/password/reset";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  sendResetPasswordRequest(record: ForgotPasswordCreateDto) {
    return this.httpClient.post<ForgotPasswordCreateDto>(this.API_FORGOT, record, this.httpOptions);
  }

  sendPasswordAndToken(record: PasswordResetDto) {
    console.log(record);
    return this.httpClient.post<PasswordResetDto>(this.API_RESET, record, this.httpOptions);
  }
}


