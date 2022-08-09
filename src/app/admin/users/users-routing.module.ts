import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakersComponent } from "../speakers/speakers.component";
import { SpeakerListComponent } from "../speakers/speaker-list/speaker-list.component";
import { SpeakerFormComponent } from "../speakers/speaker-form/speaker-form.component";
import { SpeakerShowComponent } from "../speakers/speaker-show/speaker-show.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
