import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { EventStatusPipe } from "../../core/pipes/event-status.pipe";
import { SubeventShowComponent } from './subevents/subevent-show/subevent-show.component';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventShowComponent,
    EventFormComponent,
    EventStatusPipe,
    SubeventShowComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class EventsModule { }
