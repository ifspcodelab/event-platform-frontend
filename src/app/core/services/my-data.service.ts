import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountDto, AccountTokenDto } from "../models/account.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class MyDataService extends BaseService{
  apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAccount(): Observable<AccountDto> {
    const url = `${this.apiUrl}/my-data`;
    return this.httpClient.get<AccountDto>(url, this.httpOptions);
  }

  patchAccount(accountTokenDto: AccountTokenDto): Observable<AccountDto> {
    const url = `${this.apiUrl}/my-data`;
    return this.httpClient.patch<AccountDto>(url, accountTokenDto, this.httpOptions);
  }
}
