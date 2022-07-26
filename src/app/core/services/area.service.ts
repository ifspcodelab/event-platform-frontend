import { AreaCreateDto } from './../models/area.model';
import { LocationDto } from 'src/app/core/models/location.model';
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

//  getLocationById(id: string): Observable<LocationDto> {
//    return this.httpClient.get<LocationDto>(`${this.apiUrl}/${id}`, this.httpOptions);
//  }

  getAreaById(locationId: string, areaId: string): Observable<AreaDto> {
    return this.httpClient.get<AreaDto>(`${this.apiUrl}/${locationId}/areas/${areaId}`, this.httpOptions);
  }

  postArea(locationId: string, areaCreateDto: AreaCreateDto): Observable<AreaDto> {
    const url = `${this.apiUrl}/${locationId}/areas`;
    return this.httpClient.post<AreaDto>(url, areaCreateDto, this.httpOptions);
  }
}
