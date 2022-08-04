import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakersRoutingModule } from './speakers-routing.module';
import { SpeakersComponent } from './speakers.component';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { SpeakerFormComponent } from './speaker-form/speaker-form.component';
import { SpeakerShowComponent } from './speaker-show/speaker-show.component';
import { NgxMaskModule } from "ngx-mask";


@NgModule({
  declarations: [
    SpeakersComponent,
    SpeakerListComponent,
    SpeakerFormComponent,
    SpeakerShowComponent
  ],
  imports: [
    CommonModule,
    SpeakersRoutingModule,
    CoreModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SpeakersModule { }
