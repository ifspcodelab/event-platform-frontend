import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountCreateDto, AccountDto } from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  apiUrl = `${environment.apiUrl}/accounts/registration`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  postAccount(accountCreateDto: AccountCreateDto): Observable<AccountDto> {
    return this.httpClient.post<AccountDto>(this.apiUrl, accountCreateDto, this.httpOptions);
  }

  patchAccount(token: string): Observable<AccountDto> {
    const url = `${this.apiUrl}/verification/${token}`;
    return this.httpClient.patch<AccountDto>(url, null, this.httpOptions);
  }

  
}
