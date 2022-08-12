import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountsComponent} from "./accounts.component";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    AccountsComponent,
    AccountListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
