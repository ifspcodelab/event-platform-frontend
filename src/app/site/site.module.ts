import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { SharedModule } from "../shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { LoginComponent } from "./pages/login/login.component";
import { TermsComponent } from './pages/terms/terms.component';
import { AccountPageHeaderComponent } from './components/account-page-header/account-page-header.component';
import { AccountPageFormInputComponent } from './components/account-page-form-input/account-page-form-input.component';
import { AccountPageComponent } from './components/account-page/account-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    TermsComponent,
    AccountPageHeaderComponent,
    AccountPageFormInputComponent,
    AccountPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SiteModule { }
