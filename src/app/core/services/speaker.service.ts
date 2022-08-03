import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SpeakerDto } from "../models/speaker.model";
import { map } from "rxjs/operators";
import { PageDto } from "../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  apiUrl = `${environment.apiUrl}/speakers`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getSpeakers(): Observable<PageDto<SpeakerDto>> {
    return this.httpClient.get<PageDto<SpeakerDto>>(this.apiUrl, this.httpOptions);
  }
}
