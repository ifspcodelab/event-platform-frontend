import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { first } from "rxjs";
import { LoginDto } from "../../../core/models/login.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {JwtService} from "../../../core/services/jwtservice.service";
import {JwtTokensDto} from "../../../core/models/jwt-tokens.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();
  showAuthenticationError: boolean = false;
  authenticationErrorType: string = '';
  mapAuthenticationErrorType = new Map<string, string>([
    ["unverified_account", "The account for this email is not yet verified"],
    ["incorrect_credentials", "Incorrect email or password"]
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  private buildForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]]
    });
  }

  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    console.log("form has been submitted");
    this.login();
  }

  //TODO: jwtService: setar os tokens no localstorage, decodificações, etc

  login() {
    this.authenticationService.postLogin(this.form.value)
      .pipe(first())
      .subscribe(
        {
          next: (jwtDto: JwtTokensDto) => {
            console.log(jwtDto);
            this.jwtService.storeAccessToken(jwtDto.accessToken);
            console.log(this.jwtService.decodeToken(jwtDto.accessToken));
            this.jwtService.storeRefreshToken(jwtDto.refreshToken);
            console.log(this.jwtService.decodeToken(jwtDto.refreshToken));
            this.router.navigate(['account', 'meus-dados']);
          },
          error: error => {
            if (error instanceof HttpErrorResponse) {
              console.log("an http error has ocurred");
              console.log(error);
              this.showAuthenticationError = true;
              if (error.error.title === this.mapAuthenticationErrorType.get('unverified_account')!) {
                this.authenticationErrorType = this.mapAuthenticationErrorType.get('unverified_account')!;
              }
              if (error.error.title === this.mapAuthenticationErrorType.get('incorrect_credentials')!) {
                this.authenticationErrorType = this.mapAuthenticationErrorType.get('incorrect_credentials')!;
              }
            }
          }
        }
      );
  }
}
