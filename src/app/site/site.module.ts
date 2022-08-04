import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SharedModule } from "../shared/shared.module";
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteCardComponent } from './components/site-card/site-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class SiteModule { }
