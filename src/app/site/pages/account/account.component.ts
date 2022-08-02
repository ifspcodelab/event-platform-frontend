import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {first} from "rxjs";
import {JwtService} from "../../../core/services/jwtservice.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.deleteLogout().pipe(first()).subscribe(
      () => {
        this.jwtService.removeAccessToken();
        this.jwtService.removeRefreshToken();
      }
    );
  }

}
