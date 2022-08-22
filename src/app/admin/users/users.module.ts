import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from "./users.component";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRolePipe } from "../../core/pipes/users-role.pipe";
import { CheckOrNotPipe } from "../../core/pipes/check-or-not.pipe";

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersRolePipe,
    CheckOrNotPipe,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class UsersModule { }
