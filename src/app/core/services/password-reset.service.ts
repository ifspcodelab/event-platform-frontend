import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ForgotPasswordCreateDto} from "../models/forgot-password-create-dto.model";
import {PasswordResetDto} from "../models/password-reset-dto";
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import { Observable } from "rxjs";
import { AccountDto } from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService extends BaseService {
  apiUrl = `${environment.apiUrl}/accounts/password`;
  public email: string;

  constructor(private httpClient: HttpClient) {
    super();
  }

  sendResetPasswordRequest(dto: ForgotPasswordCreateDto) {
    const url = `${this.apiUrl}/forgot`;
    return this.httpClient.post<ForgotPasswordCreateDto>(url, dto, this.httpOptionsSkipInterceptor);
  }

  postEmail(resendEmail: string): Observable<AccountDto> {
    const url = `${this.apiUrl}/forgot/resend-email`;
    return this.httpClient.post<AccountDto>(url, resendEmail, this.httpOptionsSkipInterceptor)
  }

  sendPasswordAndToken(dto: PasswordResetDto) {
    const url = `${this.apiUrl}/reset`;
    return this.httpClient.post<PasswordResetDto>(url, dto, this.httpOptionsSkipInterceptor);
  }
}


