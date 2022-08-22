import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { PageDto } from "../models/page.model";
import { AccountDto } from "../models/account.model";


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

  putAccount(accountId: string, accoountDto: AccountDto): Observable<AccountDto> {
    return this.httpClient.put<AccountDto>(`${this.apiUrl}/${accountId}`, accoountDto, this.httpOptions);
  }

  getRole(role: string){

    if(role == "ADMIN"){
      return "Administrador";
    }
    if(role == "SPEAKER"){
      return "Ministrante";
    }
    return "Participante";
  }

  transform(cpf: string): string {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

}
