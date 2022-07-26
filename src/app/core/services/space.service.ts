import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpaceCreateDto, SpaceDto } from "../models/space.model";
import { map } from "rxjs/operators";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class SpaceService extends BaseService {
  apiUrl = `${environment.apiUrl}/locations`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postSpace(locationId: string, areaId: string, spaceCreateDto: SpaceCreateDto): Observable<SpaceDto> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}/spaces`;
    return this.httpClient.post<SpaceDto>(url, spaceCreateDto, this.httpOptions);
  }

  putSpace(locationId: string, areaId: string, spaceId: string, spaceDto: SpaceDto): Observable<SpaceDto> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}/spaces/${spaceId}`;
    return this.httpClient.put<SpaceDto>(url, spaceDto, this.httpOptions);
  }

  getSpaces(locationId: string, areaId: string): Observable<SpaceDto[]> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}/spaces`;
    return this.httpClient.get<SpaceDto[]>(url, this.httpOptions)
      .pipe(
        map(results => results.sort((a, b) => a.name.localeCompare(b.name)))
      );
  }

  getSpaceById(locationId: string, areaId: string, spaceId: string): Observable<SpaceDto> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}/spaces/${spaceId}`;
    return this.httpClient.get<SpaceDto>(url, this.httpOptions);
  }

  deleteSpace(locationId: string, areaId: string, spaceId: string): Observable<unknown> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}/spaces/${spaceId}`;
    return this.httpClient.delete<SpaceDto>(url, this.httpOptions);
  }
}
