import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { JwtTokensDto } from "../../../core/models/jwt-tokens.model";
import { LoginCreateDto } from "../../../core/models/login.model";
import { AccountRole } from "../../../core/models/account-role.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();
  mapAuthenticationErrorType = new Map<string, string>([
    ["The account for this email is not yet verified", "Conta ainda não verificada, verifique seu email para ativar a sua conta"],
    ["Incorrect email or password", "Email ou senha incorretos"],
    ["Invalid recaptcha", "Recaptcha inválido, por favor realize novamente o desafio ou atualize a página"]
  ]);
  errorMessage: string | null = null;
  userRecaptcha: string = '';
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router,
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
    if(this.form.invalid || this.userRecaptcha == '') {
      return;
    }

    const loginCreateDto = new LoginCreateDto(
      this.form.value['email'],
      this.form.value['password'],
      this.userRecaptcha
    )

    this.login(loginCreateDto);
  }

  resolved(captchaResponse: string) {
    this.userRecaptcha = captchaResponse;
  }

  login(loginCreateDto: LoginCreateDto) {
    this.requestLoading = true;
    this.authenticationService.postLogin(loginCreateDto)
      .pipe(first())
      .subscribe(
        {
          next: (jwtDto: JwtTokensDto) => {
            this.jwtService.storeAccessToken(jwtDto.accessToken);
            this.jwtService.storeRefreshToken(jwtDto.refreshToken);

            const accountRoles = this.jwtService.getAccessTokenRoles();

            if (accountRoles == AccountRole.ADMIN) {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['']);
            }
          },
          error: error => {
            if (error instanceof HttpErrorResponse) {
              this.errorMessage = this.mapAuthenticationErrorType.get(error.error.title)!;
            }
            this.requestLoading = false;
            this.refreshRecaptcha();
          }
        }
      );
  }

  refreshRecaptcha(): void {
    grecaptcha.reset();
  }
}
