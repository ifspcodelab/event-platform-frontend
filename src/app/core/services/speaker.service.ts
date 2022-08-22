import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SpeakerCreateDto, SpeakerDto } from "../models/speaker.model";
import { PageDto } from "../models/page.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class SpeakerService extends BaseService {
  apiUrl = `${environment.apiUrl}/speakers`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getSpeakers(): Observable<PageDto<SpeakerDto>> {
    return this.httpClient.get<PageDto<SpeakerDto>>(this.apiUrl, this.httpOptions);
  }

  getSpeakerById(speakerId: string): Observable<SpeakerDto> {
    return this.httpClient.get<SpeakerDto>(`${this.apiUrl}/${speakerId}`, this.httpOptions);
  }

  postSpeaker(speakerCreateDto: SpeakerCreateDto): Observable<SpeakerDto> {
    return this.httpClient.post<SpeakerDto>(this.apiUrl, speakerCreateDto, this.httpOptions);
  }

  putSpeaker(speakerId: string, speakerCreateDto: SpeakerCreateDto): Observable<SpeakerDto> {
    return this.httpClient.put<SpeakerDto>(`${this.apiUrl}/${speakerId}`, speakerCreateDto, this.httpOptions);
  }

  deleteSpeaker(speakerId: string): Observable<unknown> {
    return this.httpClient.delete<SpeakerDto>(`${this.apiUrl}/${speakerId}`, this.httpOptions);
  }

  findByName(name: string): Observable<SpeakerDto[]> {
    const url = `${this.apiUrl}/searchName/${name}`;
    return this.httpClient.get<SpeakerDto[]>(url, this.httpOptions);
  }
}
