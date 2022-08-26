import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AccountDeletionModel} from "../models/account-deletion.model";
import {BaseService} from "./base.service";


@Injectable({
  providedIn: 'root'
})
export class AccountDeletionService extends BaseService{
  apiUrl = `${environment.apiUrl}/accounts/my-data/account-deletion`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  sendAccountDeletionRequest(dto: AccountDeletionModel) {
    return this.httpClient.post<AccountDeletionModel>(this.apiUrl, dto, this.httpOptions);
  }
}
