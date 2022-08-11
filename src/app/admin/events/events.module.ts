import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { SubeventShowComponent } from './subevents/subevent-show/subevent-show.component';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { SubeventsFormComponent } from "./subevents/subevents-form/subevents-form.component";
import { ActivityShowComponent } from "./activities/activity-show/activity-show.component";
import { SessionShowComponent } from "./sessions/session-show/session-show.component";
import { SessionFormComponent } from "./sessions/session-form/session-form.component";
import { ActivityFormComponent } from './activities/activity-form/activity-form.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { ActivitySpeakersComponent } from './activities/activity-speakers/activity-speakers.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventShowComponent,
    EventFormComponent,
    SubeventShowComponent,
    SubeventsFormComponent,
    ActivityShowComponent,
    ActivityFormComponent,
    SessionShowComponent,
    SessionFormComponent,
    ActivityListComponent,
    ActivitySpeakersComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
})
export class EventsModule { }
