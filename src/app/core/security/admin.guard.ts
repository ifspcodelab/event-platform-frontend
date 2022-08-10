import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from "../services/jwtservice.service";
import { AccountRole } from "../models/account-role.model";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.jwtService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['']);

      return false;
    }
  }

}
