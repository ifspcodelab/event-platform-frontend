import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakersComponent } from "../speakers/speakers.component";
import { UserListComponent } from "./user-list/user-list.component";

const routes: Routes = [
  {
    path: '',
    component: SpeakersComponent,
    children: [
      { path: '', component: UserListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
