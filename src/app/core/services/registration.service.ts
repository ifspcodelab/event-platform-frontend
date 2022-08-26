import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountCreateDto, AccountDto, ResendEmailDto } from "../models/account.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {
  public email: string;
  apiUrl = `${environment.apiUrl}/accounts/registration`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postAccount(accountCreateDto: AccountCreateDto): Observable<AccountDto> {
    return this.httpClient.post<AccountDto>(this.apiUrl, accountCreateDto, this.httpOptionsSkipInterceptor);
  }

  patchAccount(token: string): Observable<AccountDto> {
    const url = `${this.apiUrl}/verification/${token}`;
    return this.httpClient.patch<AccountDto>(url, null, this.httpOptionsSkipInterceptor);
  }

  postEmail(resendEmailDto: ResendEmailDto): Observable<String> {
    const url = `${this.apiUrl}/resend-email`;
    return this.httpClient.post<String>(url, resendEmailDto, this.httpOptionsSkipInterceptor)
  }
}
