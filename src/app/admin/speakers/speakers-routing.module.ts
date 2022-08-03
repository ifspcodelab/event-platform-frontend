import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakersComponent } from './speakers.component';
import { SpeakerListComponent } from "./speaker-list/speaker-list.component";

const routes: Routes = [
  {
    path: '',
    component: SpeakersComponent,
    children: [
      { path: '', component: SpeakerListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakersRoutingModule { }
