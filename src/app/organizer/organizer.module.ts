import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    OrganizerComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    SharedModule,
  ]
})
export class OrganizerModule { }
