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
import { MyDataComponent } from './pages/my-data/my-data.component';
import { MyDataEditComponent } from './pages/my-data-edit/my-data-edit.component';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";
import { AlterMyDataPasswordComponent } from './pages/alter-my-data-password/alter-my-data-password.component';
import { RegistrationResendEmailComponent } from './pages/registration-resend-email/registration-resend-email.component';
import { ForgotPasswordResendEmailComponent } from './pages/forgot-password-resend-email/forgot-password-resend-email.component';

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
    MyDataComponent,
    MyDataEditComponent,
    AlterMyDataPasswordComponent,
    RegistrationResendEmailComponent,
    ForgotPasswordResendEmailComponent,
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
        SharedModule,
        RouterModule,
        NgxMaskModule.forRoot(),
        CoreModule,
    ]
})
export class SiteModule { }
