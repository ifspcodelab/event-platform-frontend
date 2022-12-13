import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationCreateDto, LocationDto } from '../models/location.model';
import { map } from "rxjs/operators";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService{
  apiUrl = `${environment.apiUrl}/locations`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getLocations(): Observable<LocationDto[]> {
    return this.httpClient.get<LocationDto[]>(this.apiUrl, this.httpOptions)
    .pipe(
      map(results => results.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())))
    );
  }

  getLocationById(id: string): Observable<LocationDto> {
    return this.httpClient.get<LocationDto>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  postLocation(locationCreateDto: LocationCreateDto): Observable<LocationDto> {
    return this.httpClient.post<LocationDto>(this.apiUrl, locationCreateDto, this.httpOptions);
  }

  putLocation(locationId: string, locationCreateDto: LocationCreateDto): Observable<LocationDto> {
    const url = `${this.apiUrl}/${locationId}`;
    return this.httpClient.put<LocationDto>(url, locationCreateDto, this.httpOptions);
  }

  deleteLocation(locationId: string): Observable<unknown> {
    const url = `${this.apiUrl}/${locationId}`;
    return this.httpClient.delete<LocationDto>(url, this.httpOptions);
  }
}
