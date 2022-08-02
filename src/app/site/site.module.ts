import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AccountComponent } from './pages/account/account.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {RecaptchaModule} from "ng-recaptcha";



@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    AccountComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        RecaptchaModule
    ]
})
export class SiteModule { }
