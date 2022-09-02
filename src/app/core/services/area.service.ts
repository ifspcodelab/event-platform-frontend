import { AreaCreateDto } from './../models/area.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { AreaDto } from '../models/area.model';
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AreaService extends BaseService {
  apiUrl = `${environment.apiUrl}/locations`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAreas(locationId: string): Observable<AreaDto[]> {
    const url = `${this.apiUrl}/${locationId}/areas`;
    return this.httpClient.get<AreaDto[]>(url, this.httpOptions)
      .pipe(
        map(results => results.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }

  getAreaById(locationId: string, areaId: string): Observable<AreaDto> {
    return this.httpClient.get<AreaDto>(`${this.apiUrl}/${locationId}/areas/${areaId}`, this.httpOptions);
  }

  postArea(locationId: string, areaCreateDto: AreaCreateDto): Observable<AreaDto> {
    const url = `${this.apiUrl}/${locationId}/areas`;
    return this.httpClient.post<AreaDto>(url, areaCreateDto, this.httpOptions);
  }

  putArea(locationId: string, areaId: string, areaDto: AreaDto): Observable<AreaDto> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}`;
    return this.httpClient.put<AreaDto>(url, areaDto, this.httpOptions);
  }

  deleteArea(locationId: string, areaId: string): Observable<unknown> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}`;
    return this.httpClient.delete<AreaDto>(url, this.httpOptions);
  }
}
