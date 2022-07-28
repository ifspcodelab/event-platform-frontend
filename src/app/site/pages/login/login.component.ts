import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { first } from "rxjs";
import { LoginDto } from "../../../core/models/login.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();
  showAuthenticationError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
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
          next: (tokensDto: LoginDto) => {
            console.log(tokensDto);
            this.router.navigate(['account', 'meus-dados']);
          },
          error: error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 409) {
                this.showAuthenticationError = true;
              }
            }
          }
        }
      );
  }
}
