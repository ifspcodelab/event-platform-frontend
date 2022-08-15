import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountsComponent} from "./accounts.component";
import {AccountListComponent} from "./account-list/account-list.component";
import {SpeakerShowComponent} from "../speakers/speaker-show/speaker-show.component";
import {AccountShowComponent} from "./account-show/account-show.component";

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      { path: '', component: AccountListComponent },
      { path: ':accountId', component: AccountShowComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
