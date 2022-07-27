import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthenticationService } from "../../../core/services/authentication.service";
import {AppValidators} from "../../../core/validators/app-validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  private buildForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, AppValidators.notBlank, Validators.email]],
      //TODO: verificar "Validators.email" x regex;
      //TODO: verificar "Validators.required"
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

  login() {
    this.authenticationService.postLogin(this.form.value).subscribe();
  }
}
