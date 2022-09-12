import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventAndSubeventListComponent } from './events-and-subevents/event-and-subevent-list/event-and-subevent-list.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { SubeventShowComponent } from './subevents/subevent-show/subevent-show.component';
import { SessionShowComponent } from './sessions/session-show/session-show.component';


@NgModule({
  declarations: [
    EventAndSubeventListComponent,
    EventShowComponent,
    SubeventShowComponent,
    SessionShowComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
