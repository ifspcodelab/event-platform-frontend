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

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  removeAccessToken(accessToken: string) {
    localStorage.removeItem(accessToken);
  }

  removeRefreshToken(refreshToken: string) {
    localStorage.removeItem(refreshToken);
  }

  //TODO: [login] enviar o access token em cada requisição (PR próprio)

  //TODO: rotação transparente de tokens
  //TODO: verificar se a requisição faz parte de uma lista de endpoints abertos ou fechados (URI e método) (angular interceptors)
  //TODO: Angular Guard (permissões do usuário no front-end)

  decodeToken(token: string) {
    return jwtDecode(token)
  }
}
