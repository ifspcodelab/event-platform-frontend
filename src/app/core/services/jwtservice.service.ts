import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import { AccessTokenData } from "../models/access-token-data.model";
import { RefreshTokenData } from "../models/refresh-token-data.model";
import { AuthenticationService } from "./authentication.service";
import { RefreshTokenRotateDto } from "../models/refresh-token.model";
import { JwtTokensDto } from "../models/jwt-tokens.model";
import { first } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  storeAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }

  storeRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  removeAccessToken() {
    localStorage.removeItem('access_token');
  }

  removeRefreshToken() {
    localStorage.removeItem('refresh_token');
  }

  decodeAccessToken(accessToken: string) {
    return jwtDecode(accessToken)
  }

  decodeRefreshToken(refreshToken: string) {
    return jwtDecode(refreshToken)
  }

  isAccessTokenExpired(accessToken: string): boolean {
    const accessTokenData = this.decodeAccessToken(accessToken) as AccessTokenData;

    const now = Math.round(Date.now() / 1000);
    const tokenExpiryDate: number = accessTokenData.exp

    return now > tokenExpiryDate;
  }

  isRefreshTokenValid(refreshToken: string): boolean {
    const refreshTokenData = this.decodeRefreshToken(refreshToken) as RefreshTokenData;

    const now = Math.round(Date.now() / 1000);
    const tokenExpiryDate: number = refreshTokenData.exp

    return tokenExpiryDate > now;
  }

  rotateJwtToken() {
    const refreshToken = new RefreshTokenRotateDto(this.getRefreshToken()!);

    this.authenticationService.postRefreshTokenRotation(refreshToken)
      .pipe(first())
      .subscribe(
        (jwtDto: JwtTokensDto) => {
          this.removeAccessToken();

          this.storeAccessToken(jwtDto.accessToken);

          this.removeRefreshToken();

          this.storeRefreshToken(jwtDto.refreshToken);
        }
      );
  }

  getAccessTokenRoles() {
    const accessTokenData = this.decodeAccessToken(this.getAccessToken()!) as AccessTokenData;

    return accessTokenData.role;
  }

  isAuthenticated() {
    const accessToken = this.getAccessToken();

    if (accessToken !== null) {
      return !this.isAccessTokenExpired(accessToken)
    } else {
      return false;
    }
  }
}
