import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {JwtService} from "../../../core/services/jwtservice.service";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.jwtService.isAuthenticated();
    this.isAdmin = this.jwtService.isAdmin();
  }

  logout() {
    this.authenticationService.deleteLogout().pipe(first()).subscribe(
      () => {
        this.jwtService.logout();
        this.router.navigate(['login']);
      }
    )
  }
}
