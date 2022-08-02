import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './site/pages/home/home.component';
import { RegistrationComponent } from './site/pages/registration/registration.component';
import { LoginComponent } from "./site/pages/login/login.component";
import { TermsComponent } from "./site/pages/terms/terms.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'termos', component: TermsComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
