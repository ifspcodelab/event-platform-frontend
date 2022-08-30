import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './site/pages/home/home.component';
import { RegistrationComponent } from './site/pages/registration/registration.component';
import { ForgotPasswordComponent } from "./site/pages/forgot-password/forgot-password.component";
import { PasswordResetComponent } from "./site/pages/password-reset/password-reset.component";
import { LoginComponent } from "./site/pages/login/login.component";
import { TermsComponent } from "./site/pages/terms/terms.component";
import { RegistrationVerifyComponent } from "./site/pages/registration-verify/registration-verify.component";
import { AuthGuard } from "./core/security/auth.guard";
import { AdminGuard } from "./core/security/admin.guard";
import { MyDataComponent } from "./site/pages/my-data/my-data.component";
import { MyDataEditComponent } from "./site/pages/my-data-edit/my-data-edit.component";
import { AlterMyDataPasswordComponent } from "./site/pages/alter-my-data-password/alter-my-data-password.component";
import {AccountDeletionComponent} from "./site/pages/account-deletion/account-deletion.component";
import { AccountDeletionConfirmationComponent } from "./site/pages/account-deletion/account-deletion-confirmation/account-deletion-confirmation.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'cadastro',
    component: RegistrationComponent,
    title: 'Cadastro - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'cadastro/verificacao/:token',
    component: RegistrationVerifyComponent,
    title: 'Verificação cadastro - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'esqueci-minha-senha',
    component: ForgotPasswordComponent,
    title: 'Esqueci minha senha - Portal de Eventos IFSP - Câmpus São Paulo',
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
    component: AlterMyDataPasswordComponent,
    canActivate: [AuthGuard],
    title: 'Alterar Minha Senha - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'meus-dados/solicitar-exclusao-de-conta',
    component: AccountDeletionComponent,
    canActivate: [AuthGuard],
    title: 'Excluir Minha Conta - Portal de Eventos IFSP - Câmpus São Paulo',
  },
  {
    path: 'solicitacao-de-exclusao-de-conta-confirmada/:token',
    component: AccountDeletionConfirmationComponent,
    title: 'Solicitação Confirmada - Portal de Eventos IFSP - Câmpus São Paulo',
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
