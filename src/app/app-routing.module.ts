import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './site/pages/home/home.component';
import { RegistrationComponent } from './site/pages/registration/registration.component';
import { LoginComponent } from "./site/pages/login/login.component";
import {AccountComponent} from "./site/pages/account/account.component";
import {AuthGuard} from "./core/security/auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account/meus-dados', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
