import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationDto } from '../models/location.model';

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

  deleteLocation(locationId: string): Observable<unknown> {
    const url = `${this.apiUrl}/${locationId}`;
    return this.httpClient.delete<LocationDto>(url, this.httpOptions);
  }

}
