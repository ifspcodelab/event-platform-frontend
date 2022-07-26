import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpaceDto } from "../models/space.model";

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

  getSpaceById(locationId: string, areaId: string, spaceId: string): Observable<SpaceDto> {
    const url = `${this.apiUrl}/${locationId}/areas/${areaId}/spaces/${spaceId}`;
    return this.httpClient.get<SpaceDto>(url, this.httpOptions);
  }

}
