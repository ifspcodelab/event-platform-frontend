import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from "rxjs";
import { LoaderService } from "./loader.service";
import { AuthenticationService } from "../core/services/authentication.service";
import { JwtService } from "../core/services/jwtservice.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  show = false;
  subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe(
      state => setTimeout(() => this.show = state.show, 50)
    )
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
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
