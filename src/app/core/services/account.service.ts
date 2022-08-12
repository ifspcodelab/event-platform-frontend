import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {PageDto} from "../models/page.model";
import {UsersDto} from "../models/users.model";

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

  getAccounts(): Observable<PageDto<UsersDto>> {
    return this.httpClient.get<PageDto<UsersDto>>(this.apiUrl, this.httpOptions);
  }

  getAccountsByQuery(query: string, type: string): Observable<PageDto<UsersDto>> {
    let queryUrl = '';
    if(type == 'name'){
      queryUrl = this.apiUrl + "?name=" + query;
    }
    if(type == 'cpf'){
      queryUrl = this.apiUrl + "?cpf=" + query;
    }
    if(type == 'email'){
      queryUrl = this.apiUrl + "?email=" + query;
    }
    return this.httpClient.get<PageDto<UsersDto>>(queryUrl, this.httpOptions);
  }
}
