import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountDto, AccountTokenDto } from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  apiUrl = `${environment.apiUrl}/accounts`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  patchAccount(accountTokenDto: AccountTokenDto): Observable<AccountDto> {
    return this.httpClient.patch<AccountDto>(`${this.apiUrl}/my-data`, accountTokenDto, this.httpOptions);
  }
}
