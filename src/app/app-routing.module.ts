import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './site/pages/home/home.component';
import { RegistrationComponent } from './site/pages/registration/registration.component';
import { ForgotPasswordComponent} from "./site/pages/forgot-password/forgot-password.component";
import { PasswordResetComponent } from "./site/pages/password-reset/password-reset.component";
import { LoginComponent } from "./site/pages/login/login.component";
import { TermsComponent } from "./site/pages/terms/terms.component";
import { RegistrationVerifyComponent } from "./site/pages/registration-verify/registration-verify.component";
import { AuthGuard } from "./core/security/auth.guard";
import { AdminGuard } from "./core/security/admin.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: RegistrationComponent },
  { path: 'cadastro/verificacao/:token', component: RegistrationVerifyComponent },
  { path: 'esqueci-minha-senha', component: ForgotPasswordComponent },
  { path: 'redefinir-minha-senha/:token', component: PasswordResetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'termos', component: TermsComponent },
  { path: 'events', loadChildren: () => import('./site/pages/event/event.module').then(m => m.EventModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
