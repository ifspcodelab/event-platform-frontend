import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { AlterMyDataPasswordDto } from "../models/alter-my-data-password-dto.model";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AlterMyDataPasswordService extends BaseService{
  apiUrl = `${environment.apiUrl}/accounts/my-data/password`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  sendAlterPasswordRequest(dto: AlterMyDataPasswordDto) {
    return this.httpClient.patch<AlterMyDataPasswordDto>(this.apiUrl, dto, this.httpOptions);
  }
}
