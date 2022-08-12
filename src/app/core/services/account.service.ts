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

  getUsers(): Observable<PageDto<UsersDto>> {
    return this.httpClient.get<PageDto<UsersDto>>(this.apiUrl, this.httpOptions);
  }

  getAccountsByName(query: string): Observable<PageDto<UsersDto>> {
    let queryUrl = this.apiUrl + "?name=" + query;
    return this.httpClient.get<PageDto<UsersDto>>(queryUrl, this.httpOptions);
  }
}
