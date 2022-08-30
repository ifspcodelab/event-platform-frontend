import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { PageDto } from "../models/page.model";
import {AccountDto, AccountUpdateDto} from "../models/account.model";
import {BaseService} from "./base.service";


@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService{
  apiUrl = `${environment.apiUrl}/accounts`;


  constructor(private httpClient: HttpClient) {
    super();
  }


  getAccounts(page: number, query: string, type: string): Observable<PageDto<AccountDto>> {
    let queryUrl = this.apiUrl +
      "?page=" + page +
      "&searchType=" + type.toLowerCase() +
      "&query=" + query;
    return this.httpClient.get<PageDto<AccountDto>>(queryUrl, this.httpOptions);
  }

  getAccountById(accountId: string): Observable<AccountDto> {
    return this.httpClient.get<AccountDto>(`${this.apiUrl}/${accountId}`, this.httpOptions);
  }

  deleteAccount(accountId: string): Observable<unknown> {
    return this.httpClient.delete<AccountDto>(`${this.apiUrl}/${accountId}`, this.httpOptions);
  }

  putAccount(accountId: string, accountDto: AccountUpdateDto): Observable<AccountDto> {
    return this.httpClient.put<AccountDto>(`${this.apiUrl}/${accountId}`, accountDto, this.httpOptions);
  }

  accountDeletionConfirmation(token: string){
    const url = `${this.apiUrl}/account-deletion-confirmation/${token}`;
    return this.httpClient.get<unknown>(url, this.httpOptionsSkipInterceptor);
  }


  transform(cpf: string): string {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

}
