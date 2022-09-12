import { Component, OnInit } from '@angular/core';
import { first, Subscription } from "rxjs";
import { JwtService } from "../core/services/jwtservice.service";
import { LoaderService } from "../admin/loader.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../core/services/authentication.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
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

