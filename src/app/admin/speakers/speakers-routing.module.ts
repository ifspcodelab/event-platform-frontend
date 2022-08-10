import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakersComponent } from './speakers.component';
import { SpeakerListComponent } from "./speaker-list/speaker-list.component";
import { SpeakerFormComponent } from "./speaker-form/speaker-form.component";
import { SpeakerShowComponent } from "./speaker-show/speaker-show.component";

const routes: Routes = [
  {
    path: '',
    component: SpeakersComponent,
    children: [
      { path: '', component: SpeakerListComponent },
      { path: 'new', component: SpeakerFormComponent },
      { path: ':speakerId', component: SpeakerShowComponent },
      { path: ':speakerId/edit', component: SpeakerFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakersRoutingModule { }
