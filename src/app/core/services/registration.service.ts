import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountCreateDto, AccountDto } from "../models/account.model";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {
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


}
