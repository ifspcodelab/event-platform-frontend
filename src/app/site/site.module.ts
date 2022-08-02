import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { SharedModule } from "../shared/shared.module";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { LoginComponent } from "./pages/login/login.component";
import { TermsComponent } from './pages/terms/terms.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    TermsComponent,
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
