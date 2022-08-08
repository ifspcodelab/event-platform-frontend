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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();
  mapAuthenticationErrorType = new Map<string, string>([
    ["The account for this email is not yet verified", "Conta ainda não verificada"],
    ["Incorrect email or password", "Email ou senha incorretos"],
    ["Invalid recaptcha", "Recaptcha inválido ou expirado, atualize a página"]
  ]);
  errorMessage: string | null = null;
  userRecaptcha: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    let script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src="https://www.google.com/recaptcha/api.js";
    this.renderer.appendChild(document.body, script);
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

    console.log("form has been submitted");
    this.login(loginCreateDto);
  }

  resolved(captchaResponse: string) {
    this.userRecaptcha = captchaResponse;
  }

  login(loginCreateDto: LoginCreateDto) {
    this.authenticationService.postLogin(loginCreateDto)
      .pipe(first())
      .subscribe(
        {
          next: (jwtDto: JwtTokensDto) => {
            this.jwtService.storeAccessToken(jwtDto.accessToken);
            this.jwtService.storeRefreshToken(jwtDto.refreshToken);

            const accountRoles = this.jwtService.getAccessTokenRoles();

            if (accountRoles.includes(AccountRole.ADMIN)) {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['account', 'meus-dados']);
            }
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
