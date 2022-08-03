import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakersRoutingModule } from './speakers-routing.module';
import { SpeakersComponent } from './speakers.component';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    SpeakersComponent,
    SpeakerListComponent
  ],
  imports: [
    CommonModule,
    SpeakersRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class SpeakersModule { }
