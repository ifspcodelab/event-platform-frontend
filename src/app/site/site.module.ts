import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteCardComponent } from './components/site-card/site-card.component';
import { EventsModule } from "../admin/events/events.module";
import { EventHeaderComponent } from './components/event-header/event-header.component';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { NgxMaskModule } from "ngx-mask";
import { LoginComponent } from "./pages/login/login.component";
import { TermsComponent } from './pages/terms/terms.component';
import { RegistrationVerifyComponent } from "./pages/registration-verify/registration-verify.component";
import { AccountPageComponent } from './components/account-page/account-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteCardComponent,
    EventHeaderComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    RegistrationComponent,
    LoginComponent,
    TermsComponent,
    RegistrationVerifyComponent,
    AccountPageComponent,
  ],
  exports: [
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteCardComponent,
    EventHeaderComponent,
    RegistrationComponent,
    LoginComponent,
    AccountPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsModule,
    RouterModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgxMaskModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule
  ]
})
export class SiteModule { }
