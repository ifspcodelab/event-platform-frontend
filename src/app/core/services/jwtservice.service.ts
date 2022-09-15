import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import { AccessTokenData } from "../models/access-token-data.model";
import { RefreshTokenData } from "../models/refresh-token-data.model";
import {AccountRole} from "../models/account-role.model";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(  ) { }

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

  isRefreshTokenValid(refreshToken: string): boolean {
    const refreshTokenData = this.decodeRefreshToken(refreshToken) as RefreshTokenData;

    const now = Math.round(Date.now() / 1000);
    const tokenExpiryDate: number = refreshTokenData.exp

    return tokenExpiryDate > now;
  }

  getAccessTokenRoles() {
    const accessToken = this.getAccessToken();
    if(accessToken) {
      const accessTokenData = this.decodeAccessToken(accessToken) as AccessTokenData;
      return accessTokenData.role;
    }
    return null;
  }

  getCollaboratorEventClaim() {
    const accessToken = this.getAccessToken();
    if(accessToken) {
      const accessTokenData = this.decodeAccessToken(accessToken) as AccessTokenData;
      if(accessTokenData.collaboratorEvent.length > 0) {
        return accessTokenData.collaboratorEvent;
      }
    }
    return null;
  }

  getCollaboratorSubeventClaim() {
    const accessToken = this.getAccessToken();
    if(accessToken) {
      const accessTokenData = this.decodeAccessToken(accessToken) as AccessTokenData;
      if(accessTokenData.collaboratorSubevent.length > 0) {
        return accessTokenData.collaboratorSubevent;
      }
    }
    return null;
  }

  getCoordinatorEventClaim() {
    const accessToken = this.getAccessToken();
    if(accessToken) {
      const accessTokenData = this.decodeAccessToken(accessToken) as AccessTokenData;
      if(accessTokenData.coordinatorEvent.length > 0)
        return accessTokenData.coordinatorEvent;
    }
    return null;
  }

  getCoordinatorSubeventClaim() {
    const accessToken = this.getAccessToken();
    if(accessToken) {
      const accessTokenData = this.decodeAccessToken(accessToken) as AccessTokenData;
      if(accessTokenData.coordinatorSubevent.length > 0) {
        return accessTokenData.coordinatorSubevent;
      }
    }
    return null;
  }

  isAuthenticated() {
    const refreshToken = this.getRefreshToken();

    if (refreshToken !== null) {
      return this.isRefreshTokenValid(refreshToken);
    } else {
      return false;
    }
  }

  logout() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  isAdmin() {
    return this.getAccessTokenRoles() == AccountRole.ADMIN;
  }

  isOrganizer() {
    return !!(this.getCollaboratorEventClaim() ||
      this.getCollaboratorSubeventClaim() ||
      this.getCoordinatorEventClaim() ||
      this.getCoordinatorSubeventClaim());
  }
}
