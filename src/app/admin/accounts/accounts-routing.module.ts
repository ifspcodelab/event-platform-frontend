import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountsComponent} from "./accounts.component";
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountSearchComponent} from "./account-search/account-search.component";

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      { path: '', component: AccountListComponent },
      { path: 'search', component: AccountSearchComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
