import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventAndSubeventListComponent } from './events-and-subevents/event-and-subevent-list/event-and-subevent-list.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { SubeventShowComponent } from './subevents/subevent-show/subevent-show.component';
import { SessionShowComponent } from './sessions/session-show/session-show.component';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { EventsComponent } from "./events.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";

@NgModule({
  declarations: [
    EventsComponent,
    EventAndSubeventListComponent,
    EventShowComponent,
    SubeventShowComponent,
    SessionShowComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
  {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
],
})
export class EventsModule { }
