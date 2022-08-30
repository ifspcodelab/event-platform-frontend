import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountsComponent} from "./accounts.component";
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountShowComponent} from "./account-show/account-show.component";
import {AccountFormComponent} from "./account-form/account-form.component";

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      { path: '', component: AccountListComponent },
      { path: ':accountId', component: AccountShowComponent },
      { path: ':accountId/edit', component: AccountFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
