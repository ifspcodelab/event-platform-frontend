import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationCreateDto, LocationDto } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiUrl = `${environment.apiUrl}/locations`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getLocations(): Observable<LocationDto[]> {
    return this.httpClient.get<LocationDto[]>(this.apiUrl, this.httpOptions);
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
