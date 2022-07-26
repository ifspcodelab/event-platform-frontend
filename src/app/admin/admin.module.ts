import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { SpaceShowComponent } from './spaces/space-show/space-show.component';

@NgModule({
  declarations: [
    AdminComponent,
    SpaceShowComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
  ]
})
export class AdminModule { }
