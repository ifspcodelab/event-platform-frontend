import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';



@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class SiteModule { }
