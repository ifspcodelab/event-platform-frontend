import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AreaDto } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  apiUrl = `${environment.apiUrl}/locations`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAreas(locationId: string): Observable<AreaDto[]> {
    const url = `${this.apiUrl}/${locationId}/areas`;
    return this.httpClient.get<AreaDto[]>(url, this.httpOptions);
  }

//  getLocationById(id: string): Observable<AreaDto> {
//    return this.httpClient.get<AreaDto>(`${this.apiUrl}/${id}`, this.httpOptions);
//  }
}
