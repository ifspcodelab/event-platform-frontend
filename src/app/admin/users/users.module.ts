import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from "./users.component";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class UsersModule { }
