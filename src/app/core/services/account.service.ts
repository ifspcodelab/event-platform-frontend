import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {PageDto} from "../models/page.model";
import {UsersDto} from "../models/users.model";
import {AccountDto} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = `${environment.apiUrl}/accounts`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAccounts(pageNumber: number): Observable<PageDto<UsersDto>> {
    return this.httpClient.get<PageDto<UsersDto>>(this.apiUrl + "?page=" + pageNumber, this.httpOptions);
  }

  getAccountsByQuery(query: string, type: string): Observable<PageDto<UsersDto>> {
    let queryUrl = '';
    if(type == 'NAME'){
      queryUrl = this.apiUrl + "?name=" + query;
    }
    if(type == 'CPF'){
      queryUrl = this.apiUrl + "?cpf=" + query;
    }
    if(type == 'EMAIL'){
      queryUrl = this.apiUrl + "?email=" + query;
    }
    return this.httpClient.get<PageDto<UsersDto>>(queryUrl, this.httpOptions);
  }

  getAccountById(accountId: string): Observable<AccountDto> {
    return this.httpClient.get<AccountDto>(`${this.apiUrl}/${accountId}`, this.httpOptions);
  }

  deleteAccount(accountId: string): Observable<unknown> {
    return this.httpClient.delete<AccountDto>(`${this.apiUrl}/${accountId}`, this.httpOptions);
  }


  putAccount(accountId: string, accoountDto: AccountDto): Observable<AccountDto> {
    return this.httpClient.put<AccountDto>(`${this.apiUrl}/${accountId}`, accoountDto, this.httpOptions);
  }
}
