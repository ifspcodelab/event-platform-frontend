import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountsComponent} from "./accounts.component";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import { AccountShowComponent } from './account-show/account-show.component';
import { AccountFormComponent } from './account-form/account-form.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    AccountsComponent,
    AccountListComponent,
    AccountShowComponent,
    AccountFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AccountsRoutingModule,
    MatSlideToggleModule,
  ]
})
export class AccountsModule { }
