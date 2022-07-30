import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";



@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class SiteModule { }
