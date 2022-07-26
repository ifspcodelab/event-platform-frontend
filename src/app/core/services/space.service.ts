import { Observable } from 'rxjs';
import { SpaceDto } from './../models/space.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  apiUrl = `${environment.apiUrl}/locations`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getSpaces(locationId?: string | null, areaId?: string | null): Observable<SpaceDto[]> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}/spaces`;
    return this.httpClient.get<SpaceDto[]>(url, this.httpOptions);
  }
}
