import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from "../services/jwtservice.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.jwtService.isAuthenticated()) {
      return true;
    } else {
      this.jwtService.removeAccessToken();
      this.jwtService.removeRefreshToken();

      if(
        state.url.startsWith("/minhas-inscricoes/recusar-vaga") ||
        state.url.startsWith("/minhas-inscricoes/aceitar-vaga")
      ) {
        this.router.navigate(['login'], { queryParams: { redirect: 'waitingConfirmation' }});
      } else {
        this.router.navigate(['login']);
      }

      return false;
    }
  }

}
