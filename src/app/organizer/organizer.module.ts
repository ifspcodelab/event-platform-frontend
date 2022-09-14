import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import {
  EventAndSubeventListComponent
} from "./events-and-subevents/event-and-subevent-list/event-and-subevent-list.component";
import { SessionListComponent } from "./sessions/session-list/session-list.component";
import { SessionShowComponent } from "./sessions/session-show/session-show.component";
import { EventShowComponent } from "./events/event-show/event-show.component";

@NgModule({
  declarations: [
    OrganizerComponent,
    EventAndSubeventListComponent,
    SessionListComponent,
    SessionShowComponent,
    EventShowComponent,
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    CoreModule,
    SharedModule,

  ]
})
export class OrganizerModule { }
