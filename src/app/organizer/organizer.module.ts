import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    OrganizerComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class OrganizerModule { }
