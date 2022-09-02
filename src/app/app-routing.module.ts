import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './site/pages/home/home.component';
import { SignupComponent } from './site/pages/signup/signup.component';
import { ForgotPasswordComponent } from "./site/pages/forgot-password/forgot-password.component";
import { PasswordResetComponent } from "./site/pages/password-reset/password-reset.component";
import { LoginComponent } from "./site/pages/login/login.component";
import { TermsComponent } from "./site/pages/terms/terms.component";
import { SignupVerifyComponent } from "./site/pages/signup-verify/signup-verify.component";
import { AuthGuard } from "./core/security/auth.guard";
import { AdminGuard } from "./core/security/admin.guard";
import { MyDataComponent } from "./site/pages/my-data/my-data.component";
import { MyDataEditComponent } from "./site/pages/my-data-edit/my-data-edit.component";
import {
  SignupResendEmailComponent
} from "./site/pages/signup-resend-email/signup-resend-email.component";
import {
  ForgotPasswordResendEmailComponent
} from "./site/pages/forgot-password-resend-email/forgot-password-resend-email.component";
import { MyDataAlterPasswordComponent } from "./site/pages/my-data-alter-password/my-data-alter-password.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'cadastro',
    component: SignupComponent,
    title: 'Cadastro - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'cadastro/reenviar-email',
    component: SignupResendEmailComponent,
    title: 'Reenvio de email de cadastro - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'cadastro/verificacao/:token',
    component: SignupVerifyComponent,
    title: 'Verificação do cadastro - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'esqueci-minha-senha',
    component: ForgotPasswordComponent,
    title: 'Esqueci minha senha - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'esqueci-minha-senha/reenviar-email',
    component: ForgotPasswordResendEmailComponent,
    title: 'Reenvio de email Esqueci minha senha - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'redefinir-minha-senha/:token',
    component: PasswordResetComponent,
    title: 'Redefinir senha - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'termos',
    component: TermsComponent,
    title: 'Termos de Uso - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'meus-dados',
    component: MyDataComponent,
    canActivate: [AuthGuard],
    title: 'Meus Dados - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'meus-dados/editar',
    component: MyDataEditComponent,
    canActivate: [AuthGuard],
    title: 'Editar Meus Dados - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'meus-dados/alterar-minha-senha',
    component: MyDataAlterPasswordComponent,
    canActivate: [AuthGuard],
    title: 'Alterar Minha Senha - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard, AdminGuard],
    title: 'Área Administrativa',
  },
  {
    path: '',
    loadChildren: () => import('./site/pages/event/event.module').then(m => m.EventModule),
    title: 'Eventos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
