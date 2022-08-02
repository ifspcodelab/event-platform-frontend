import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { JwtTokensDto } from "../../../core/models/jwt-tokens.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();
  mapAuthenticationErrorType = new Map<string, string>([
    ["The account for this email is not yet verified", "Conta ainda não verificada"],
    ["Incorrect email or password", "Email ou senha incorretos"]
  ]);
  errorMessage: string | null = null;

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

  resolved($event: string) {

  }

  login() {
    this.authenticationService.postLogin(this.form.value)
      .pipe(first())
      .subscribe(
        {
          next: (jwtDto: JwtTokensDto) => {
            this.jwtService.storeAccessToken(jwtDto.accessToken);
            this.jwtService.storeRefreshToken(jwtDto.refreshToken);

            this.router.navigate(['account', 'meus-dados']);
          },
          error: error => {
            if (error instanceof HttpErrorResponse) {
              this.errorMessage = this.mapAuthenticationErrorType.get(error.error.title)!;
              console.log("an http error has ocurred");
              console.log(error);
            }
          }
        }
      );
  }
}
