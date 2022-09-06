import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";

import { environment } from "../../../environments/environment";
import { MyDataAlterPasswordDto } from "../models/alter-my-data-password-dto.model";


@Injectable({
  providedIn: 'root'
})
export class MyDataAlterPasswordService extends BaseService{
  apiUrl = `${environment.apiUrl}/accounts/my-data/password`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  sendAlterPasswordRequest(dto: MyDataAlterPasswordDto) {
    return this.httpClient.patch<MyDataAlterPasswordDto>(this.apiUrl, dto, this.httpOptions);
  }
}
