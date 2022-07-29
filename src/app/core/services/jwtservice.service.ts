import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  storeAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }

  storeRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
  }

  removeToken(token: string) {
    localStorage.removeItem(token);
  }

  decodeToken(token: string) {
    return jwtDecode(token)
  }
}
