import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SiteModule { }
