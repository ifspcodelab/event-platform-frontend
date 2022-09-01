import { Component, OnInit } from '@angular/core';
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
import {ProblemDetail} from "../../../core/models/problem-detail";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();
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
    private notificationService: NotificationService,
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
            this.handleError(error);
          }
        }
      );
  }

  refreshRecaptcha(): void {
    grecaptcha.reset();
  }

  handleError(error: any) {
    this.requestLoading = false;
    this.refreshRecaptcha();

    if(error instanceof HttpErrorResponse) {
      const problem: ProblemDetail = error.error;
      if (problem.title == "The account for this email is not yet verified"){
        this.notificationService.error("Por favor verifique sua conta");
      }
      if (problem.title == "The account for this email is blocked by admin"){
        this.notificationService.error("Sua conta foi bloqueada");
      }
      if (problem.title == "The account for this email is waiting for exclusion"){
        this.notificationService.error("Sua conta foi bloqueada");
      }
      if (problem.title == "Incorrect email or password"){
        this.notificationService.error("Login falhou");
      }
      if (problem.title == "Invalid recaptcha"){
        this.notificationService.error("Recaptcha inválido. Atualize e tente novamente");
      }
    }
  }
}
